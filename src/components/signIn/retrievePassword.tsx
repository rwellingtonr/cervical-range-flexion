import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import InputTxt from "./inputTxt"
import style from "./sign.module.scss"
import InputPassword from "./inputPassword"
import SignInButton from "./buttonModal/signInButton"

export default function RetrievePassword() {
	const [coffito, setCoffito] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const navigate = useNavigate()

	const handleNewPassword = async () => {
		try {
			navigate("/measurement", { replace: true })
		} catch (error) {
			console.error(error)
		}
	}

	const handleKeyPress = async (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") return await handleNewPassword()
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
					<h1>Nova Senha</h1>
				</div>

				<InputTxt label="Coffito" placeHolder="Informe seu Coffito" fillIn={setCoffito} />

				<InputPassword setPassword={setPassword} password={password} />

				<SignInButton message={"Registrar"} handleClick={handleNewPassword} />
			</Box>
		</div>
	)
}
