import React, { useEffect, useState } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import { api } from "../../service/api"
import AreaDisplayChart from "../charts/areaDisplayChart"
import Box from "@mui/material/Box"
import style from "./historyChart.module.scss"
import DefaultButton from "../defaultButton.ts/defaultButton"
import { Movement } from "../../interface/movement"
import { movementOptions } from "../../utils/movements"

type MeasureHistory = {
	id: string
	measurement_date: Date
	score: number
	patient_id: string
	physio_crefito: string
	patient: Patient
}
type Patient = {
	id: string
	name: string
	cpf: string
	gender: string
	birthday: Date
	surgery_date: Date
}

export default function HistoryChart() {
	const { id } = useParams<"id">()
	const [searchParams] = useSearchParams()
	const startDate = searchParams.get("startDate")
	const endDate = searchParams.get("endDate")
	const movement = searchParams.get("movement")
	const [data, setData] = useState<MeasureHistory[]>([])

	useEffect(() => {
		retrieveData()
			.then(content => {
				console.log(content)
				setData(content)
			})
			.catch(e => console.error(e))
	}, [id, startDate, endDate])

	const setIsoStringDate = (dateString: string) => new Date(dateString).toISOString()

	const retrieveData = async () => {
		const res = await api.get<MeasureHistory[]>(`/history/${id}`, {
			params: {
				firstDate: !startDate ? setIsoStringDate(startDate as string) : "",
				lastDate: !endDate ? setIsoStringDate(endDate as string) : "",
				movement,
			},
		})

		return res.data
	}

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

	return data.length ? (
		<>
			<AreaDisplayChart dataValues={data} xAxis={"measurement_date"} areaValue={"score"} />
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
				<div>
					<Link to={"/patientHistory"} style={{ textDecoration: "none" }}>
						<DefaultButton>Voltar</DefaultButton>
					</Link>
				</div>
			</Box>
		</>
	) : (
		<Box component={"div"} className={style.notFoundWrapper}>
			<h3 className={style.notFoundSubtitle}>
				Nenhuma coleta foi encontrada para esse paciente
			</h3>
			<div className={style.actionButtonWrapper}>
				<Link to={"/patientHistory"} style={{ textDecoration: "none" }}>
					<DefaultButton>Voltar</DefaultButton>
				</Link>
			</div>
		</Box>
	)
}
