import { Box } from "@chakra-ui/react";
import Image from "next/image";
import default_profile_img from "../../public/default_user.jpg"
import { useRouter } from "next/router";
import React from "react";
import { User } from "@/models/user";

type LayoutProps = {
	children: React.ReactNode,
	userList: User[]
}

function ChatLayout({ children, userList }: LayoutProps) {
	const router = useRouter()

	return (
		<div className="w-full flex justify-center mt-32">
			<Box minH={"650px"} w={"65%"} p={6} rounded={6} className="flex bg-zinc-900">
				<div className="w-1/3 ">
					<h2 className="text-2xl font-semibold text-light">Conversar com:</h2>

					<ul className="mt-9 flex flex-col gap-2">
						{userList?.map((user) => (
							<li onClick={() => router.push(`/chat/with/${user.id}`, undefined, {shallow: true})} className="border-2 border-zinc-700 flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-zinc-700 rounded-xl" key={user.id}>
								<Image src={default_profile_img} alt="a default profile image" className="w-7 rounded-full"/>
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