import ChatLayout from "@/components/chat-layout";
import ChatMessage from "@/components/chat-message";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { useUserStore } from "@/store/useUserStore";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client"

export async function getServerSideProps() {
  const chatsResponse = await axios.get<User[]>("http://localhost:5000/users");
  const chats = chatsResponse.data;
  return { props: { chats } };
}

function Chat({ chats }: { chats: User[] }) {
	const [messagesState, setMessagesState] = useState<Message[]>([])
	const [websocket, setWebSocket] = useState<any>();
	const [message, setMessage] = useState("")
	const router = useRouter()
	const receiverID = router.query.id

	const { user } = useUserStore()

	useEffect(() => {
		async function getChatMessages() {
			const res = await axios.get<Message[]>(`http://localhost:5000/messages?senderId=${user.id}&receiverId=${receiverID}`)
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
		
		const ws = io("ws://localhost:5000", {auth: { userid: user.id }})
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
		websocket.emit("message", {message, receiverId: receiverID})
	}
	return (
		<ChatLayout userList={chats}>
			<div className="flex flex-col h-[35.6rem]">
				<div className="h-[94%] overflow-auto">
					{messagesState.map(mes => {
						console.log(typeof mes.createdAt)
						return (
							<ChatMessage 
								key={mes.id} 
								sender={mes.sender.name} 
								text={mes.text} 
								senderPicUrl={mes.sender.profile_url}
							/>
						)
					})}
				</div>
				<div className="flex-1 flex gap-2">
					<Input onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Digite sua mensagem" size="lg" color="white"/>
					<Button onClick={sendMessage} colorScheme="primary" size="lg">Enviar</Button>
				</div>
			</div>
		</ChatLayout>
	)
}

export default Chat;