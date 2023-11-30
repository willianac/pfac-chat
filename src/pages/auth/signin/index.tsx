import ErrorBox from '@/components/error-box';
import useAuthentication from '@/hooks/useAuthentication';
import { Input, Button, FormControl } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react';

function SignIn() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [showError, setShowError] = useState(false)

	const { signIn } = useAuthentication()
	const router = useRouter()

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const res = await signIn({email, password})

		if(res.data.id) {
			return router.push("/chat")
		}

		handleExceptions(res.data.message)
	}

	const handleExceptions = (exceptionMsg: string) => {
		if(exceptionMsg === "wrong credentials") {
			setErrorMessage("Email ou senha inválidos")
		} else {
			setErrorMessage("Erro desconhecido")
		}
		
		setShowError(true)
	}

	return (
		<div className="flex flex-col items-center">
			<h1 className='text-light text-7xl font-bold mt-32'>Play For a Cause - Chat</h1>
			<h3 className='text-light text-3xl font-semibold'>Entre na sua conta</h3>
			<form onSubmit={handleSubmit} className='mt-20 md:w-1/4'>
				<FormControl className='mb-6'>
					<Input type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" colorScheme='primary' bg="#fffaf2" size="lg"/>
				</FormControl>
				<FormControl className='mb-6'>
					<Input type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" colorScheme='primary' bg="#fffaf2" size="lg"/>
				</FormControl>

				{showError && <ErrorBox message={errorMessage}/>} 

				<Button type='submit' colorScheme='primary' className='w-full mb-4' size="lg">Entrar</Button>
			</form>
			<span className='text-white font-bold'>
				Não tem uma conta? 
				<span onClick={() => router.push("signup")} className='text-blue-600 font-bold hover:underline cursor-pointer'> Criar</span>
			</span>
		</div>
	)
}
export default SignIn;