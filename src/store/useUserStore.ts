import { User } from "@/models/user"
import { create } from "zustand"

type UserState = {
	user: User
	saveUser: (user: User) => void
	logout: () => void
	updatedProfilePic: (url: string) => void
}

export const useUserStore = create<UserState>((set) => ({
	user: {
		id: "",
		name: "",
		email: "",
		profile_url: ""
	},
	saveUser: (user) => set({user: {id: user.id, name: user.name, email: user.email, profile_url: user.profile_url}}),
	logout: () => set({user: {id: "", name: "", email: "", profile_url: ""}}),
	updatedProfilePic: (url) => set((state) => ({user: {...state.user, profile_url: url}}))
}))