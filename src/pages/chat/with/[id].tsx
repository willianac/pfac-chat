import ChatLayout from "@/components/chat-layout";
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
	const previousMessagesResponse = await axios.get<Message[]>("http://localhost:5000/messages")

  const chats = chatsResponse.data;
	const previousMessages = previousMessagesResponse.data
  return { props: { chats, previousMessages } };
}

function Chat({ chats, previousMessages }: { chats: User[], previousMessages: Message[] }) {
	const [messagesState, setMessagesState] = useState(previousMessages)
	const [websocket, setWebSocket] = useState<any>();
	const [message, setMessage] = useState("")
	const router = useRouter()
	const receiverID = router.query.id

	const { user } = useUserStore()

	useEffect(() => {
		async function getChatMessages() {
			const res = await axios.get<Message[]>(`http://localhost:5000/messages?senderId=${user.id}&receiverId=${receiverID}`)
			setMessagesState([...res.data])
		}
		getChatMessages()

	}, [receiverID, user.id])


	useEffect(() => {
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
			<div className="flex flex-col h-full">
				<div className="h-[94%]">
					{messagesState.map(mes => {
						console.log(mes)
						return <h1 key={mes.id} className="text-white">{mes.text}</h1>
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