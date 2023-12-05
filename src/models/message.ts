export type Message = {
	id: string
	text?: string
	image_url?: string
	sender_id: string
	sender: {
		name: string,
		profile_url: string
	}
	receiver_id: string,
	receiver: {
		name: string,
		profile_url: string
	}
	createdAt: string
}