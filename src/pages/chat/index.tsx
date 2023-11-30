import ChatLayout from "@/components/chat-layout";
import { User } from "@/models/user";
import axios from "axios";

export async function getServerSideProps() {
  const res = await axios.get<User[]>("http://localhost:5000/users");
  const data = res.data;
  return { props: { data } };
}

function ChatHome({ data }: {data: User[]}) {
  return (
    <ChatLayout userList={data}>
      <h1 className="text-light text-center text-2xl font-medium mb-2">Selecione um usuário para começar uma conversa.</h1>
      <span className="text-zinc-500 block text-center">A lista contém todos os usuários que estão usando ou já usaram a aplicação.</span>
    </ChatLayout>
  );
}

export default ChatHome;