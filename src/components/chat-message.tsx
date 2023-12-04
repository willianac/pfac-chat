import Image from "next/image"
import default_profile_img from "../../public/default_user.jpg"
import { useUserStore } from "@/store/useUserStore"

type ChatMessageProps = {
	sender: string
	text: string,
	senderPicUrl: string
	time: string
}

function ChatMessage({ text, sender, senderPicUrl, time }: ChatMessageProps) {

	const { user } = useUserStore()
	const senderPic = senderPicUrl ? senderPicUrl : default_profile_img
	const stylesIfUserIsTheSender = sender === user.name ? "flex-row-reverse ml-auto" : "";
	const nameAlignment = sender === user.name ? "text-right" : "text-left"

	const messageTime = new Date(time)

	return (
		<div className={`flex gap-3 w-fit p-2 max-w-lg mb-2 ${stylesIfUserIsTheSender}`}>
			<div>
				<Image src={senderPic} alt="a default profile image" width={30} height={30} className="rounded-full"/>
			</div>
			<div className="flex flex-col">
				<div className={`${nameAlignment} flex items-center gap-2 ${sender === user.name ? "justify-end" : "justify-normal"}`}>
					<h4 className={`text-light font-medium`}>{sender}</h4>
					<span 
						className="text-xs text-zinc-600"
					>
						`{messageTime.getDate()}/{messageTime.getMonth() + 1}/{messageTime.getFullYear()}`
					</span>
				</div>
				<p className="text-light">{text}</p>
			</div>
		</div>
	)
}

export default ChatMessage