import React, { createContext, ReactNode, useState, useContext, useCallback } from "react"
import type { Patient } from "../interface/patient"
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

const PatientContext = createContext({} as PatientContextValue)

export const usePatient = () => useContext(PatientContext)

export default function PatientProvider({ children }: PatientProvider) {
	const [patient, setPatient] = useState<Patient | null>(null)
	const [patients, setPatientIds] = useState<Patient[]>([])

	const retrievePatients = useCallback(async () => {
		const res = await api.get<Patient[]>("/patient")
		setPatientIds(res.data)
	}, [])

	return (
		<PatientContext.Provider value={{ patient, patients, setPatient, retrievePatients }}>
			{children}
		</PatientContext.Provider>
	)
}
