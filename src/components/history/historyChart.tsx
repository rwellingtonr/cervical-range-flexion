import React, { useEffect, useState } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import { api } from "../../service/api"
import AreaDisplayChart from "../charts/areaDisplayChart"
import Box from "@mui/material/Box"
import style from "./historyChart.module.scss"
import DefaultButton from "../defaultButton.ts/defaultButton"

type MeasureHistory = {
	id: string
	measurement_date: Date
	score: number
	patient_id: string
	physio_coffito: string
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
	const [data, setData] = useState<MeasureHistory[]>([])
	const [userName, setUserName] = useState<string>("")

	useEffect(() => {
		retrieveData()
			.then(content => setData(content))
			.catch(e => console.error(e))

		retrieveUser()
			.then(content => setUserName(content.name))
			.catch(e => console.error(e))
	}, [id, startDate, endDate])

	const retrieveData = async () => {
		const res = await api.get<MeasureHistory[]>(`/history/${id}`, {
			params: {
				firstDate: !startDate ? new Date(startDate as string).toISOString() : "",
				lastDate: !endDate ? new Date(endDate as string).toISOString() : "",
			},
		})

		return res.data
	}

	const retrieveUser = async () => {
		const res = await api.get<Patient>(`/patient/${id}`)
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
			const real = diff - 100
			return `${real}%`
		}
	}

	return data.length ? (
		<>
			<AreaDisplayChart dataValues={data} xAxis={"measurement_date"} areaValue={"score"} />
			<Box className={style.boxWrapper}>
				<div className={style.displayInfo}>
					<h2 className={style.tableHeader}>{userName}</h2>
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
		<></>
	)
}
