import React from "react"
import style from "./stackSelect.module.scss"
import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

type StackSelectProps = {
	label: string
	options: any[]
	placeholder: string
	handleSelect: (selected: string) => void
	getOptionLabel: (option: any) => string
}

export default function StackSelect({
	handleSelect,
	label,
	placeholder,
	...props
}: StackSelectProps) {
	return (
		<Stack spacing={1} className={style.stackWrapper}>
			<Autocomplete
				{...props}
				id="auto-highlight"
				autoHighlight
				onInputChange={(_, newInputValue) => handleSelect(newInputValue)}
				renderInput={params => (
					<TextField
						{...params}
						sx={{
							"& .MuiOutlinedInput-root": { borderRadius: "20px" },
						}}
						label={label}
						placeholder={placeholder}
						variant="outlined"
					/>
				)}
			/>
		</Stack>
	)
}
