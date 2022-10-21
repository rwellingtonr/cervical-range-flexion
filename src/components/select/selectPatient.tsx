import React, { useEffect } from "react"
import { usePatient } from "../../context/patient"
import { useAuth } from "../../context/auth"
import { useNavigate } from "react-router-dom"
import StackSelect from "../stackSelect/stackSelect"

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
	const stackProps = {
		...defaultProps,
		label: "Paciente",
		placeholder: "Selecione o paciente",
		handleSelect,
	}

	return <StackSelect {...stackProps} />
}
