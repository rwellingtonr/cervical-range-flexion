import React, { createContext, ReactNode, useState } from "react"
import { api } from "../service/api"

type PatientProvider = {
	children: ReactNode
}
type PatientContextValue = {
	patient: Patient | null
	patients: Patient[]
	setPatient: (patient: Patient | null) => void
	retrievePatients: () => Promise<void>
}
type Patient = {
	id: string
	name: string
	cpf: string
	gender: string
	birthday: Date
	surgery_date: Date
}

const PatientContext = createContext({} as PatientContextValue)

export default function PatientProvider({ children }: PatientProvider) {
	const [patient, setPatient] = useState<Patient | null>(null)
	const [patients, setPatientIds] = useState<Patient[]>([])

	const retrievePatients = async () => {
		const res = await api.get<Patient[]>("/patient")
		setPatientIds(res.data)
	}

	return (
		<PatientContext.Provider value={{ patient, patients, setPatient, retrievePatients }}>
			{children}
		</PatientContext.Provider>
	)
}

export const usePatient = () => React.useContext(PatientContext)
