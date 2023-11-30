import ChatLayout from "@/components/chat-layout";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Chat() {
	const router = useRouter()
	

	return (
		<ChatLayout>
			<div className="flex flex-col h-full">
				<div className="h-[94%]">
					teste
				</div>
				<div className="flex-1 flex gap-2">
					<Input type="text" placeholder="Digite sua mensagem" size="lg" color="white"/>
					<Button colorScheme="primary" size="lg">Enviar</Button>
				</div>
			</div>
		</ChatLayout>
	)
}

export default Chat;