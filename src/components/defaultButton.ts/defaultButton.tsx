import React, { ReactNode } from "react"
import Button from "@mui/material/Button"
import style from "./defaultButton.module.scss"

type DfButton = {
	handleClick?: () => void
	children: ReactNode
	type?: "button" | "submit" | "reset"
}

export default function DefaultButton({ children, handleClick, type = "submit" }: DfButton) {
	return (
		<Button
			type={type}
			className={style.Button}
			variant="contained"
			size="large"
			onClick={handleClick}
		>
			{children}
		</Button>
	)
}
