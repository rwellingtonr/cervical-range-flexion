import React, { useEffect } from "react"
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
	const { patients, retrievePatients, setPatient } = usePatient()
	const { signOut } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		retrievePatients().catch(e => {
			if (e.response.status === 401) {
				signOut()
				navigate("/", { replace: true })
			}
			console.error(e)
		})
	}, [retrievePatients])

	const defaultProps = {
		options: patients,
		getOptionLabel: (option: Patient) => option.name,
	}

	const handleSelect = (name: string) => {
		const person = patients.find(patient => patient.name === name)
		if (person) {
			setPatient(person)
			return
		}
		setPatient(null)
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
						placeholder="Selecione o paciente"
						variant="outlined"
					/>
				)}
			/>
		</Stack>
	)
}
