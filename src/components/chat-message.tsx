import Image from "next/image"
import default_profile_img from "../../public/default_user.jpg"
import { useUserStore } from "@/store/useUserStore"

type ChatMessageProps = {
	sender: string
	text: string,
	senderPicUrl: string
}

function ChatMessage({ text, sender, senderPicUrl }: ChatMessageProps) {

	const { user } = useUserStore()
	const senderPic = senderPicUrl ? senderPicUrl : default_profile_img
	const stylesIfUserIsTheSender = sender === user.name ? "flex-row-reverse ml-auto" : "";
	const nameAlignment = sender === user.name ? "text-right" : "text-left"

	return (
		<div className={`flex gap-3 w-fit p-2 max-w-lg mb-2 ${stylesIfUserIsTheSender}`}>
			<div>
				<Image src={senderPic} alt="a default profile image" width={30} height={30} className="rounded-full"/>
			</div>
			<div className="flex flex-col">
				<h4 className={`text-light font-medium ${nameAlignment}`}>{sender}</h4>
				<p className="text-light">{text}</p>
			</div>
		</div>
	)
}

export default ChatMessage