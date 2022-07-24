import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import FilledInput from "@mui/material/FilledInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

type PasswordProps = {
	setPassword: (event: string) => void
	password: string
}

function InputPassword({ setPassword, password }: PasswordProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	return (
		<FormControl
			sx={{ m: 1, width: "350px", background: "#ffff", borderRadius: "5px" }}
			variant="filled"
		>
			<InputLabel htmlFor="filled-adornment-password">Senha</InputLabel>
			<FilledInput
				id="filled-adornment-password"
				type={showPassword ? "text" : "password"}
				value={password}
				onChange={e => setPassword(e.target.value)}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	)
}

export default InputPassword
