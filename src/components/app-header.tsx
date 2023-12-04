import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/router";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import default_profile_img from "../../public/default_user.jpg"
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import axios from "axios";

function AppHeader() {
	const router = useRouter()
	const { user, logout, updatedProfilePic } = useUserStore()

	const doLogout = () => {
		logout()
		router.push("/auth/signin")
	}

	const userProfilePic = user.profile_url ? user.profile_url : default_profile_img

	const inputFileRef = useRef<HTMLInputElement>()
	const choosePick = () => {
		if(inputFileRef.current) {
			inputFileRef.current.click()
		}
	}

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const data = new FormData()
		data.append("image", e.target.files![0])
		data.append("userid", user.id)

		const res = await axios.post("http://localhost:5000/user/profile", data)
		updatedProfilePic(res.data.profile_url)
	}

	return (
		<header className="h-16 bg-black w-full flex items-center justify-between px-80">
			{
				user.id ?
					<>
						<div className="flex items-center gap-2">
							<Image src={userProfilePic} width={3} height={3} alt="a default profile image" className="w-7 rounded-full"/>
							<Menu>
								<MenuButton as={Button} colorScheme="primary" rightIcon={<ChevronDownIcon />} size="sm">
									Olá {user.name}
								</MenuButton>
								<MenuList>
									<MenuItem>
										<input 
											type="file"
											className="input-file" 
											placeholder="teste" 
											id="filePick" 
											accept="image/png, image/jpeg"
											ref={inputFileRef as React.RefObject<HTMLInputElement>}
											onChange={(e) => handleImageChange(e)}
										/>
										<span onClick={choosePick}>Alterar foto</span>
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
						<span onClick={doLogout} className="text-primary cursor-pointer hover:underline">Sair</span>
					</> :
					<h1 className="text-primary font-semibold text-lg">Real Time Chat</h1>
			}
		</header>
	)
}

export default AppHeader;