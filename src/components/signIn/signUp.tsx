import React, { FormEvent, useState, KeyboardEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../service/api"
import { useAlert } from "../../context/alert"
import Box from "@mui/material/Box"
import Form from "./form"
import InputTxt from "./inputTxt"
import InputPassword from "./inputPassword"
import SignInButton from "./buttonModal/signInButton"
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
		<Box component={"div"} p={2}>
			<CustomizedSnackbars />
			<Form handleKeyPress={handleKeyPress} handleSubmit={handleSubmit}>
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
				<Box component={"div"}>
					<Link to="/sign/password" style={{ textDecoration: "none", color: "inherit" }}>
						<p>Esqueci minha senha</p>
					</Link>
				</Box>
				<SignInButton message={"Registrar"} />
			</Form>
		</Box>
	)
}
