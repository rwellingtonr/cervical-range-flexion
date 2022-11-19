import React from "react"
import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles"

type Props = {
	label: string
	placeHolder: string
	value: string
	fillIn: (event: string) => void
}

const Text = styled(TextField)(() => ({
	borderRadius: "10px",
	background: "#ffff",
	width: "350px",
	maxWidth: "100%",
}))

export default function InputTxt({ value, label, placeHolder, fillIn }: Props) {
	return (
		<div>
			{" "}
			<Text
				required
				id="outlined-required"
				label={label}
				placeholder={placeHolder}
				value={value}
				onChange={e => fillIn(e.target.value)}
			/>
		</div>
	)
}
