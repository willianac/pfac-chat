import ChatLayout from "@/components/chat-layout";
import { User } from "@/models/user";
import { useUserStore } from "@/store/useUserStore";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client"

export async function getServerSideProps() {
  const res = await axios.get<User[]>("http://localhost:5000/users");
  const data = res.data;
  return { props: { data } };
}

function Chat({ data }: { data: User[] }) {
	const [websocket, setWebSocket] = useState<any>();
	const [message, setMessage] = useState("")
	const router = useRouter()
	const receiverID = router.query.id

	const { user } = useUserStore()

	useEffect(() => {
		const ws = io("ws://localhost:5000", {auth: { userid: user.id }})
		setWebSocket(ws)

		ws.on("message", (e: any) => {
			console.log(e)
		})

		return () => {
			ws.disconnect()
		}

	}, [receiverID, user.id])

	const sendMessage = () => {

		websocket.emit("message", message)
	}

	return (
		<ChatLayout userList={data}>
			<div className="flex flex-col h-full">
				<div className="h-[94%]">
					teste
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