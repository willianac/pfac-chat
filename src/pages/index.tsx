import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Socket, io } from 'socket.io-client'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [text, setText] = useState("")
	const [websocket, setWebSocket] = useState<Socket>()

	// useEffect(() => {
	// 	const socket = io("ws://localhost:5000")

	// 	socket.on("connect", () => {
	// 		console.log("connected")
	// 	})
	// 	console.log("rerendered")
	// 	socket.on("disconnect", (e) => {
	// 		console.log("disconnected");
	// 	})

	// 	setWebSocket(socket)
	// }, [])

	// function sendMessage() {
	// 	console.log("chamou")
	// 	if(websocket) {
	// 		const obj = {
	// 			nome: "eu",
	// 			id: "asoudhaiusdhax1231",
	// 			text: "text"
	// 		}
	// 		websocket.emit("message", obj)
	// 	}
	// }

  return (
    <main>
			<h1 className='text-blue-500'>teste</h1>
		</main>
  )
}
