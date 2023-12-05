import ErrorBox from "@/components/error-box";
import useAuthentication from "@/hooks/useAuthentication";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

function SignUp() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [errorMessage, setErrorMessage] = useState("")
	const [showError, setShowError] = useState(false)

	const { signUp } = useAuthentication()
	const router = useRouter()

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const res = await signUp({name, email, password})

		if(res.data.id) {
			return router.push("/chat")
		}

		handleExceptions(res.data.message)
	}

	const handleExceptions = (exceptionMsg: string) => {
		if(exceptionMsg === "user already exists") {
			setErrorMessage("Esse e-mail já está sendo usado por outra pessoa")
		} else {
			setErrorMessage("Erro desconhecido")
		}
		
		setShowError(true)
	}
	 
	return (
		<div className="flex flex-col items-center">
			<h1 className='text-light text-3xl md:text-7xl font-bold mt-32'>Play For a Cause - Chat</h1>
			<h3 className='text-light text-2xl md:text-3xl font-semibold'>Crie uma conta</h3>
			<form onSubmit={handleSubmit} className='mt-20 w-3/4 md:w-1/4'>
			<FormControl className='mb-6'>
					<Input type='text' onChange={(e) => setName(e.target.value)} placeholder="Seu nome" colorScheme='primary' bg="#fffaf2" size="lg"/>
				</FormControl>
				<FormControl className='mb-6'>
					<Input type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" colorScheme='primary' bg="#fffaf2" size="lg"/>
				</FormControl>
				<FormControl className='mb-6'>
					<Input type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" colorScheme='primary' bg="#fffaf2" size="lg"/>
				</FormControl>

				{showError && <ErrorBox message={errorMessage}/>}

				<Button type="submit" colorScheme='primary' className='w-full mb-4' size="lg">Cadastrar</Button>
			</form>
			<span className='text-white font-bold'>
				Já tem uma conta?  
				<span onClick={() => router.push("signin")} className='text-blue-600 font-bold hover:underline cursor-pointer'> Entrar</span>
			</span>
		</div>
	)
}

export default SignUp;