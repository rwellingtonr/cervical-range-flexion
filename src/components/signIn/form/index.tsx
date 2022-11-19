import React, { FormEvent, KeyboardEvent, ReactNode } from "react"
import Box from "@mui/material/Box"
import style from "./index.module.scss"

type FormProps = {
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
	handleKeyPress: (event: KeyboardEvent<HTMLFormElement>) => void
	children: ReactNode
}

export default function Form({ handleSubmit, handleKeyPress, children }: FormProps) {
	return (
		<Box
			component="form"
			className={style.form}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
			onKeyPress={handleKeyPress}
		>
			{children}
		</Box>
	)
}
