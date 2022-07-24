import React, { useEffect } from "react"
import { usePatient } from "../../context/patient"
import PersonInfo from "../personInfo/personInfo"
import SelectPatient from "../stackSelect/selectPatient"

export default function MeasurementIndex() {
	const { patient, setPatient } = usePatient()

	useEffect(() => setPatient(null), [])

	return (
		<>
			<SelectPatient />
			{patient && <PersonInfo patient={patient} />}
		</>
	)
}
