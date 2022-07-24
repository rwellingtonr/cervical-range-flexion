import React, { useEffect, useRef } from "react"
import style from "./selectPatient.module.scss"
import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { usePatient } from "../../context/patient"
import { useAuth } from "../../context/auth"
import { useNavigate } from "react-router-dom"

type Patient = {
	id: string
	name: string
	cpf: string
	gender: string
	birthday: Date
	surgery_date: Date
}

export default function SelectPatient() {
	const isFirstRender = useRef<boolean>(true)
	const { patients, retrievePatients, setPatient } = usePatient()
	const { signOut } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		retrievePatients().catch(e => {
			if (e.response.status === 401) {
				signOut()
				navigate("/", { replace: true })
			}
			console.error(e)
		})
	}, [])

	const defaultProps = {
		options: patients,
		getOptionLabel: (option: Patient) => option.name,
	}

	const handleSelect = (name: string) => {
		const person = patients.find(patient => patient.name === name)
		setPatient(person as Patient)
	}
	return (
		<Stack spacing={1} className={style.stackWrapper}>
			<Autocomplete
				{...defaultProps}
				id="auto-highlight"
				autoHighlight
				onInputChange={(event, newInputValue) => handleSelect(newInputValue)}
				renderInput={params => (
					<TextField
						{...params}
						sx={{
							"& .MuiOutlinedInput-root": { borderRadius: "20px" },
						}}
						label="Paciente"
						variant="outlined"
					/>
				)}
			/>
		</Stack>
	)
}
