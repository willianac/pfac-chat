import axios from "axios"

function useAuthentication() {
	const signIn = async(signInData: {email: string, password: string}) => {
		const response = await axios.post("http://localhost:5000/signin", {...signInData})

		return response
	}

	const signUp = async(signUpData: {name: string, email: string, password: string}) => {
		const response = await axios.post("http://localhost:5000/signup", { ...signUpData } )

		return response
	}

	return {
		signIn,
		signUp
	}
}

export default useAuthentication;