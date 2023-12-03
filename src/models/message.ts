export type Message = {
	id: string
	text: string
	sender_id: string
	sender: {
		name: string
	}
	receiver_id: string,
	receiver: {
		name: string
	}
	createdAt: Date
}