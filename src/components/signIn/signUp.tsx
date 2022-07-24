import React, { useState } from "react"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import InputTxt from "./inputTxt"
import style from "./sign.module.scss"
import InputPassword from "./inputPassword"
import SignInButton from "./buttonModal/signInButton"
import { useNavigate } from "react-router-dom"
import { api } from "../../service/api"

export default function SignUp() {
	const [coffito, setCoffito] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [userName, setUserName] = useState<string>("")

	const navigate = useNavigate()

	const handleRegister = async () => {
		try {
			const userInfo = {
				coffito,
				password,
				name: userName,
			}

			await api.post("/physiotherapist", userInfo)
			navigate("/sign/login", { replace: true })
		} catch (error) {
			console.error(error)
		}
	}
	const handleKeyPress = async (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") return await handleRegister()
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
					<h1>Registrar</h1>
				</div>
				<InputTxt
					label="Nome"
					placeHolder="Informe seu nome completo"
					fillIn={setUserName}
				/>
				<InputTxt label="Coffito" placeHolder="Informe seu Coffito" fillIn={setCoffito} />

				<InputPassword setPassword={setPassword} password={password} />
				<div>
					<Link to="/sign/password">
						<p>Esqueci minha senha</p>
					</Link>
				</div>
				<SignInButton message={"Registrar"} handleClick={handleRegister} />
			</Box>
		</div>
	)
}
