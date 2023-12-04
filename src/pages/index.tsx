import { useUserStore } from "@/store/useUserStore"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Home() {
	const router = useRouter()
	const { user } = useUserStore()

	useEffect(() => {
		if(!user.id) {
			router.push("/auth/signin")
		} else {
			router.push("/chat")
		}
	}, [])
	
  return (
    <main>
			<h1 className='text-blue-500'>Home</h1>
		</main>
  )
}
