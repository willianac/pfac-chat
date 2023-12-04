import ChatLayout from "@/components/chat-layout";
import { User } from "@/models/user";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps() {
  const res = await axios.get<User[]>(process.env.NEXT_PUBLIC_API_URL + "/users");
  const data = res.data;
  return { props: { data } };
}

function ChatHome({ data }: {data: User[]}) {

	const router = useRouter()
	const { user } = useUserStore()

	useEffect(() => {
		if(!user.id) {
			router.push("/auth/signin")
		} else {
			router.push("/chat")
		}
	}, [])

  return (
    <ChatLayout userList={data}>
      <h1 className="text-light text-center text-2xl font-medium mb-2">Selecione um usuário para começar uma conversa.</h1>
      <span className="text-zinc-500 block text-center">A lista contém todos os usuários que estão usando ou já usaram a aplicação.</span>
    </ChatLayout>
  );
}

export default ChatHome;