import React, { FormEvent, useState, KeyboardEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import InputTxt from "./inputTxt"
import style from "./sign.module.scss"
import InputPassword from "./inputPassword"
import SignInButton from "./buttonModal/signInButton"
import { api } from "../../service/api"
import { useAlert } from "../../context/alert"
import CustomizedSnackbars from "../alert/alert"

type SignUpProps = {
	validateCrefito: (crefito: string) => boolean
}

export default function SignUp({ validateCrefito }: SignUpProps) {
	const [crefito, setCrefito] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [userName, setUserName] = useState<string>("")
	const { handleAlert } = useAlert()

	const navigate = useNavigate()

	const handleRegister = async () => {
		try {
			const isValidCrefito = validateCrefito(crefito)
			if (!isValidCrefito) return handleAlert("Crefito inválido", "warning")
			if (!password.trim() || !userName.trim()) {
				return handleAlert("Usuário ou senha inválida", "warning")
			}

			const userInfo = {
				crefito,
				password,
				name: userName,
			}
			await api.post("/physiotherapist", userInfo)
			navigate("/sign/login", { replace: true })
		} catch (error) {
			console.error(error)
			handleAlert("Verifique os campos preenchidos")
		}
	}
	const handleKeyPress = async (event: KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			await handleRegister()
		}
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await handleRegister()
	}

	return (
		<div className={style.formWrapper}>
			<CustomizedSnackbars />
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
				onSubmit={handleSubmit}
				onKeyPress={handleKeyPress}
			>
				<div>
					<h1>Registrar</h1>
				</div>
				<InputTxt
					label="Nome"
					value={userName}
					placeHolder="Informe seu nome completo"
					fillIn={setUserName}
				/>
				<InputTxt
					label="Crefito"
					value={crefito}
					placeHolder="Informe seu Crefito, exemplo: 8123456TO"
					fillIn={setCrefito}
				/>

				<InputPassword setPassword={setPassword} password={password} />
				<div>
					<Link to="/sign/password" style={{ textDecoration: "none", color: "inherit" }}>
						<p>Esqueci minha senha</p>
					</Link>
				</div>
				<SignInButton message={"Registrar"} />
			</Box>
		</div>
	)
}
