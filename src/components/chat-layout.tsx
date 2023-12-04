import { Box } from "@chakra-ui/react";
import Image from "next/image";
import default_profile_img from "../../public/default_user.jpg"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { User } from "@/models/user";
import { useUserStore } from "@/store/useUserStore";

type LayoutProps = {
	children: React.ReactNode,
	userList: User[]
}

function ChatLayout({ children, userList }: LayoutProps) {
	const router = useRouter()
	const { user } = useUserStore()
	const [chatList, setChatList] = useState<User[]>([])

	useEffect(() => {
		const removeItselfFromList = userList.filter(chatUser => chatUser.id !== user.id)
		setChatList(removeItselfFromList)
	}, [])

	return (
		<div className="w-full flex justify-center mt-24">
			<Box minH={"650px"} w={"65%"} p={6} rounded={6} className="flex bg-zinc-900">
				<div className="w-1/3 ">
					<h2 className="text-2xl font-semibold text-light">Conversar com:</h2>

					<ul className="mt-9 flex flex-col gap-2">
						{chatList?.map((user) => (
							<li onClick={() => router.push(`/chat/with/${user.id}`, undefined, {shallow: true})} className="border-2 border-zinc-700 flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-zinc-700 rounded-xl" key={user.id}>
								<Image src={user.profile_url ? user.profile_url : default_profile_img} width={30} height={30} alt="a default profile image" className="rounded-full"/>
								<span className="text-light text-lg font-medium">{user.name}</span>
							</li>
						))}
					</ul>
					
				</div>
				<div className="flex-1 ml-6 bg-zinc-950 rounded-lg p-4">
					{children}
				</div>
			</Box>
		</div>
	)
}

export default ChatLayout;