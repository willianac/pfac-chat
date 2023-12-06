import ChatLayout from "@/components/chat-layout";
import ChatMessage from "@/components/chat-message";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { useUserStore } from "@/store/useUserStore";
import { Button, Input, Icon } from "@chakra-ui/react";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client"

export async function getServerSideProps() {
  const chatsResponse = await axios.get<User[]>(process.env.NEXT_PUBLIC_API_URL + "/users");
  const chats = chatsResponse.data;
  return { props: { chats } };
}

function Chat({ chats }: { chats: User[] }) {
	const [messagesState, setMessagesState] = useState<Message[]>([])
	const [websocket, setWebSocket] = useState<any>();
	const [message, setMessage] = useState("")
	const router = useRouter()
	const receiverID = router.query.id
	const inputFileRef = useRef<HTMLInputElement>()

	const { user } = useUserStore()

	useEffect(() => {
		async function getChatMessages() {
			const res = await axios.get<Message[]>(`${process.env.NEXT_PUBLIC_API_URL}/messages?senderId=${user.id}&receiverId=${receiverID}`)
			const sortedMessages = res.data.sort((a, b) => {
				const dateA = new Date(a.createdAt).getTime()
				const dateB = new Date(b.createdAt).getTime()
				return dateA - dateB;
			})
			setMessagesState(sortedMessages)
		}
		getChatMessages()

	}, [receiverID, user.id])

	useEffect(() => {
		if(!user.id) {
			router.push("/auth/signin")
		}
		
		const ws = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string, {auth: { userid: user.id }})
		setWebSocket(ws)

	}, [receiverID])

	useEffect(() => {
		if(websocket) {
			websocket.on("connect", () => {
				console.log("conectou")
			})
	
			websocket.on("message", (responseMessage: Message) => {
				setMessagesState(prevState => [...prevState, responseMessage])
			})
		}

		return () => {
			if(websocket) {
				console.log("disconectando")
				websocket.disconnect()
			}
		}

	}, [websocket])


	const sendMessage = () => {
		if(!message) {
			return
		}
		websocket.emit("message", {message, receiverId: receiverID})
		setMessage("")
	}

	const choosePic = () => {
		if(inputFileRef.current) {
			inputFileRef.current.click()
		}
	}

	const handleImagePick = (event: ChangeEvent<HTMLInputElement>) => {
		const data = new FormData()
		data.append("image", event.target.files![0])
		data.append("receiverId", receiverID as string)
		websocket.emit("message", {image: event.target.files![0], receiverId: receiverID})
	}

	return (
		<ChatLayout userList={chats}>
			<div className="flex flex-col h-[35.6rem]">
				<div className="h-[94%] overflow-auto">
					{messagesState.map(mes => {
						return (
							<ChatMessage 
								key={mes.id} 
								sender={mes.sender.name} 
								text={mes.text} 
								imageUrl={mes.image_url}
								senderPicUrl={mes.sender.profile_url}
								time={mes.createdAt}
							/>
						)
					})}
				</div>
				<div className="flex-1 flex gap-2">
					<Input 
						onChange={(e) => setMessage(e.target.value)} 
						type="text" 
						placeholder="Digite sua mensagem" 
						size="lg" color="white" 
						value={message}
					/>	
					<Button size="lg" colorScheme="blue" onClick={choosePic}>
						<input 
							type="file" 
							accept="image/png, image/jpeg" 
							onChange={(e) => handleImagePick(e)} 
							className="input-file" 
							ref={inputFileRef as React.RefObject<HTMLInputElement>}
						/>
						<Icon as={CiImageOn}/>
					</Button>
					<Button type="submit" onClick={sendMessage} colorScheme="primary" size="lg">Enviar</Button>
				</div>
			</div>
		</ChatLayout>
	)
}

export default Chat;