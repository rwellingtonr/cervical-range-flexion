import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import InputTxt from "./inputTxt"
import style from "./sign.module.scss"
import InputPassword from "./inputPassword"
import SignInButton from "./buttonModal/signInButton"
import { api } from "../../service/api"
import { useAlert } from "../../context/alert"
import CustomizedSnackbars from "../alert/alert"
import { AxiosError } from "axios"

type RetrievePasswordProps = {
	validateCrefito: (crefito: string) => boolean
}

export default function RetrievePassword({ validateCrefito }: RetrievePasswordProps) {
	const [crefito, setCrefito] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const navigate = useNavigate()
	const { handleAlert } = useAlert()

	const handleNewPassword = async () => {
		try {
			const isValidCrefito = validateCrefito(crefito)
			if (!isValidCrefito) return handleAlert("Crefito inválido", "warning")
			if (!password.trim()) return handleAlert("Senha inválida", "warning")
			await api.patch(`/physiotherapist/${crefito}`, { password })
			navigate("/sign/login", { replace: true })
		} catch (err) {
			console.error(err)
			if (err instanceof AxiosError) return handleAxiosError(err.response?.status)

			handleAlert("Verifique os dados de entrada")
		}
	}
	function handleAxiosError(status?: number) {
		if (status === 404) return handleAlert("Usuário não encontrado!")
		handleAlert("Senha deve ser diferente da anterior!")
	}

	const handleKeyPress = async (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			return await handleNewPassword()
		}
	}
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await handleNewPassword()
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
					<h1>Nova Senha</h1>
				</div>

				<InputTxt
					label="Crefito"
					value={crefito}
					placeHolder="Informe seu Crefito, exemplo: 8123456TO"
					fillIn={setCrefito}
				/>

				<InputPassword setPassword={setPassword} password={password} />

				<SignInButton message={"Registrar"} handleClick={handleNewPassword} />
			</Box>
		</div>
	)
}
