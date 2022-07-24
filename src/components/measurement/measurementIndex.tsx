import React from "react"
import { usePatient } from "../../context/patient"
import PersonInfo from "../personInfo/personInfo"
import SelectPatient from "../stackSelect/selectPatient"

export default function MeasurementIndex() {
	const { patient } = usePatient()

	return (
		<>
			<SelectPatient />
			{patient && <PersonInfo patient={patient} />}
		</>
	)
}
