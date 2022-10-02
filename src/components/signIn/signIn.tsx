import React, { useState, FormEvent } from "react"
import { useAuth } from "../../context/auth"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import InputTxt from "./inputTxt"
import style from "./sign.module.scss"
import InputPassword from "./inputPassword"
import SignInButton from "./buttonModal/signInButton"
import CustomizedSnackbars from "../alert/alert"
import { useAlert } from "../../context/alert"

type SignInProps = {
	validateCrefito: (crefito: string) => boolean
}

export default function SignIn({ validateCrefito }: SignInProps) {
	const { signIn } = useAuth()
	const { handleAlert } = useAlert()
	const navigate = useNavigate()
	const [crefito, setCrefito] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const handleSignIn = async () => {
		try {
			const isValidCrefito = validateCrefito(crefito)
			if (!isValidCrefito) return handleError("Crefito inválido", "warning")
			if (!password.trim()) return handleError("Senha inválida", "warning")

			await signIn({ crefito, password })
			navigate("/measurement", { replace: true })
		} catch (error) {
			console.error("Error ao tentar fazer o logIn", error)
			handleError("Error ao tentar fazer o logIn")
		}
	}
	function handleError(msg: string, type?: string) {
		setCrefito("")
		setPassword("")
		handleAlert(msg, type)
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await handleSignIn()
	}
	const handleKeyPress = async (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			return await handleSignIn()
		}
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
					<h1>Começar</h1>
				</div>

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

				<SignInButton message={"Conectar"} />
			</Box>
		</div>
	)
}
