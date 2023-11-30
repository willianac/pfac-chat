type ChatMessageProps = {
	sender: string
	text: string
}

function ChatMessage({ text, sender }: ChatMessageProps) {

	const alignAt = sender === "Willian" ? "right" : "left"
	return (
		<div className="">
			<p className={alignAt === "right" ? "text-right" : "text-left"}>{text}</p>
		</div>
	)
}

export default ChatMessage