import ChatLayout from "@/components/chat-layout";

function ChatList() {

	return (
		<ChatLayout>
			<h1 className="text-light text-center text-2xl font-medium mb-2">Selecione um usuário para começar uma conversa.</h1>
			<span className="text-zinc-500 block text-center">A lista contém todos os usuários que estão usando ou já usaram a aplicação.</span>
		</ChatLayout>
	)
}

export default ChatList;