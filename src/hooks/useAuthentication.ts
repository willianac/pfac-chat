import { User } from "@/models/user"
import { useUserStore } from "@/store/useUserStore"
import axios from "axios"

function useAuthentication() {
	const { saveUser } = useUserStore()

	const signIn = async(signInData: {email: string, password: string}) => {
		const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/signin", {...signInData})
		const userData = response.data as User
		saveUser(userData)
		return response
	}

	const signUp = async(signUpData: {name: string, email: string, password: string}) => {
		const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/signup", { ...signUpData } )
		const userData = response.data as User
		saveUser(userData)
		return response
	}

	return {
		signIn,
		signUp
	}
}

export default useAuthentication;