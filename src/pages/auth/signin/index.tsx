import { Input, Button, FormControl } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react';

function SignIn() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const router = useRouter()


	return (
		<div className="flex flex-col items-center">
			<h1 className='text-light text-7xl font-bold mt-32'>Play For a Cause - Chat</h1>
			<h3 className='text-light text-3xl font-semibold'>Entre na sua conta</h3>
			<form className='mt-20 md:w-1/4'>
				<FormControl className='mb-6'>
					<Input type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" colorScheme='primary' bg="#fffaf2" size="lg"/>
				</FormControl>
				<FormControl className='mb-6'>
					<Input type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" colorScheme='primary' bg="#fffaf2" size="lg"/>
				</FormControl>
				<Button colorScheme='primary' className='w-full mb-4' size="lg">Entrar</Button>
			</form>
			<span className='text-white font-bold'>
				Não tem uma conta? 
				<span onClick={() => router.push("signup")} className='text-blue-600 font-bold hover:underline cursor-pointer'> Criar</span>
			</span>
		</div>
	)
}
export default SignIn;