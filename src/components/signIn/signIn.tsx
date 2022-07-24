import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import InputTxt from "./inputTxt"
import style from "./sign.module.scss"
import InputPassword from "./inputPassword"
import SignInButton from "./buttonModal/signInButton"
import { useNavigate } from "react-router-dom"

export default function SignIn() {
	const { signIn } = useAuth()
	const navigate = useNavigate()
	const [coffito, setCoffito] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const handleSignIn = async () => {
		try {
			await signIn({ coffito, password })
			navigate("/measurement", { replace: true })
		} catch (error) {
			console.log("Error ao tentar fazer o logIn", error)
		}
		setCoffito("")
		setPassword("")
	}
	const handleKeyPress = async (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") return await handleSignIn()
	}

	return (
		<div className={style.formWrapper}>
			<Box
				component="form"
				className={style.form}
				sx={{
					"& .MuiTextField-root": {
						m: 0,
						width: "350px",
						maxWidth: "100%",
					},
				}}
				noValidate
				autoComplete="off"
				onKeyPress={handleKeyPress}
			>
				<div>
					<h1>Começar</h1>
				</div>

				<InputTxt label="Coffito" placeHolder="Informe seu Coffito" fillIn={setCoffito} />

				<InputPassword setPassword={setPassword} password={password} />
				<div>
					<Link to="/sign/password">
						<p>Esqueci minha senha</p>
					</Link>
				</div>

				<SignInButton message={"Conectar"} handleClick={handleSignIn} />
			</Box>
		</div>
	)
}
