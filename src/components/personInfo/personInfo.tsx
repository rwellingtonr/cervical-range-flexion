import React from "react"
import { Link } from "react-router-dom"
import DefaultButton from "../defaultButton.ts/defaultButton"
import style from "./personInfo.module.scss"

type Patient = {
	id: string
	name: string
	cpf: string
	gender: string
	birthday: Date
	surgery_date: Date
}

type PersonInfo = {
	patient: Patient
}

export default function PersonInfo({ patient }: PersonInfo) {
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("pt-BR")
	}

	return (
		<>
			<main className={style.personWrapper}>
				<h2 className={style.name}>{patient?.name}</h2>
				<div className={style.tableInLine}>
					<p>Nascimento: </p>
					<p>{formatDate(patient?.birthday)}</p>
				</div>
				<div className={style.tableInLine}>
					<p>Cirurgia: </p>
					<p>{formatDate(patient?.surgery_date)}</p>
				</div>
			</main>
			<div className={style.bottom}>
				<Link to={"/charts"} style={{ textDecoration: "none" }}>
					<DefaultButton> Prosseguir </DefaultButton>
				</Link>
			</div>
		</>
	)
}
