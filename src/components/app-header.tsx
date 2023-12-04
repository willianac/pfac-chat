import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/router";

function AppHeader() {
	const router = useRouter()
	const { user, logout } = useUserStore()

	const doLogout = () => {
		logout()
		router.push("/auth/signin")
	}

	return (
		<header className="h-16 bg-black w-full flex items-center justify-between px-80">
			{
				user.id ?
					<>
						<h1 className="text-primary font-semibold text-lg">Olá {user.name}</h1>
						<span onClick={doLogout} className="text-light cursor-pointer hover:underline">Sair</span>
					</> :
					<h1 className="text-primary font-semibold text-lg">Real Time Chat</h1>
			}
		</header>
	)
}

export default AppHeader;