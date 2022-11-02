import React from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import style from "./index.module.scss"
import DefaultButton from "../defaultButton.ts/defaultButton"
import { Link } from "react-router-dom"
import { Movement } from "../../interface/movement"
import { movementOptions } from "../../utils/movements"
import type { MeasureHistory } from "../../interface/measurement"

type HistoryInfoProps = {
	data: MeasureHistory[]
	movement: string | null
	switchState: () => void
	state: boolean
}

export default function HistoryInfo({ data, movement, switchState, state }: HistoryInfoProps) {
	const period = () => {
		if (data.length) {
			const firstDate = new Date(data[0].measurement_date).getTime()
			const lastDate = new Date(data.at(-1)?.measurement_date as Date).getTime()
			const diff = Math.abs(firstDate - lastDate)
			const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
			return `${days} dias`
		}
	}

	const improvement = () => {
		if (data.length) {
			const firstScore = data[0].score
			const lastScore = data.at(-1)?.score as number
			const diff = (lastScore * 100) / firstScore
			const real = (diff - 100).toFixed(2)
			return `${real}%`
		}
	}

	const pickMovement = (selectedMovement: Movement) => {
		const option = movementOptions.find(m => m.movement === selectedMovement)
		return option?.label
	}

	return (
		<Box className={style.boxWrapper}>
			<div className={style.displayInfo}>
				<h2 className={style.tableHeader}>{data[0].patient.name}</h2>
				<div className={style.tableWrapper}>
					<h4>Movimento: </h4>
					<p>{pickMovement(movement as Movement)}</p>
				</div>
				<div className={style.tableWrapper}>
					<h4>Período: </h4>
					<p>{period()}</p>
				</div>
				<div className={style.tableWrapper}>
					<h4>Diferença %:</h4>
					<p>{improvement()}</p>
				</div>
			</div>
			<Stack spacing={2}>
				<Link to={"/patientHistory"} style={{ textDecoration: "none" }}>
					<DefaultButton>Voltar</DefaultButton>
				</Link>
				<DefaultButton handleClick={switchState}>
					{state ? "Mostrar gráfico" : "Mostrar tabela"}
				</DefaultButton>
			</Stack>
		</Box>
	)
}
