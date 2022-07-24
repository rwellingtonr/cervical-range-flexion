import React from "react"
import { Outlet } from "react-router-dom"
import style from "./patientHistory.module.scss"

function PatientHistory() {
	return (
		<main className={style.patientHistWrapper}>
			<h1>Histórico de Paciente</h1>

			<Outlet />
		</main>
	)
}

export default PatientHistory
