import Image from "next/image"
import default_profile_img from "../../public/default_user.jpg"
import { useUserStore } from "@/store/useUserStore"

type ChatMessageProps = {
	sender: string
	text: string
}

function ChatMessage({ text, sender }: ChatMessageProps) {

	const { user } = useUserStore()

	const stylesIfUserIsTheSender = sender === user.name ? "flex-row-reverse ml-auto" : "";
	const nameAlignment = sender === user.name ? "text-right" : "text-left"
	return (
		<div className={`flex gap-3 w-fit p-2 max-w-lg mb-2 ${stylesIfUserIsTheSender}`}>
			<div>
				<Image src={default_profile_img} alt="a default profile image" className="w-7 rounded-full"/>
			</div>
			<div className="flex flex-col">
				<h4 className={`text-light font-medium ${nameAlignment}`}>{sender}</h4>
				<p className="text-light">{text}</p>
			</div>
		</div>
	)
}

export default ChatMessage