import React from "react"
import { Link } from "react-router-dom"
import { usePatient } from "../../context/patient"
import DefaultButton from "../defaultButton.ts/defaultButton"
import style from "./personInfo.module.scss"

export default function PersonInfo() {
	const { patient } = usePatient()
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("pt-BR")
	}

	return (
		<>
			<main className={style.personWrapper}>
				<h2 className={style.name}>{patient?.name}</h2>
				<div className={style.tableInLine}>
					<p>Nascimento: </p>
					<p>{formatDate(patient?.birthday as Date)}</p>
				</div>
				<div className={style.tableInLine}>
					<p>Cirurgia: </p>
					<p>{formatDate(patient?.surgery_date as Date)}</p>
				</div>
			</main>
			<div className={style.bottom}>
				<Link to={"/measurement/realtime"} style={{ textDecoration: "none" }}>
					<DefaultButton> Prosseguir </DefaultButton>
				</Link>
			</div>
		</>
	)
}
