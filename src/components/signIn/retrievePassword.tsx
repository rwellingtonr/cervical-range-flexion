import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../service/api"
import { useAlert } from "../../context/alert"
import { AxiosError } from "axios"
import Box from "@mui/material/Box"
import InputTxt from "./inputTxt"
import InputPassword from "./inputPassword"
import SignInButton from "./buttonModal/signInButton"
import CustomizedSnackbars from "../alert/alert"
import Form from "./form"

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
		<Box component="div" p={2}>
			<CustomizedSnackbars />
			<Form handleKeyPress={handleKeyPress} handleSubmit={handleSubmit}>
				<Box component="div">
					<h1>Nova Senha</h1>
				</Box>

				<InputTxt
					label="Crefito"
					value={crefito}
					placeHolder="Informe seu Crefito, exemplo: 8123456TO"
					fillIn={setCrefito}
				/>

				<InputPassword setPassword={setPassword} password={password} />

				<SignInButton message={"Registrar"} handleClick={handleNewPassword} />
			</Form>
		</Box>
	)
}
