import React, { useEffect, useState, useCallback } from "react"
import AreaDisplayChart from "../charts/areaDisplayChart"
import ProgressCircle from "../circularProgress"
import Box from "@mui/material/Box"
import style from "./realTime.module.scss"
import { socket } from "../../service/websocket"
import { usePatient } from "../../context/patient"
import { useNavigate } from "react-router-dom"
import OpenIconSpeedDial from "../speedDial/speedDial"

type Measure = {
	times: number
	score: number
}
type ActionsToTake = "preload" | "loaded"

const counter = (function () {
	let i = 0

	function reset() {
		return (i = 0)
	}

	function increment() {
		return i++
	}

	return {
		reset: () => reset(),
		increment: () => increment(),
	}
})()

export default function RealTime() {
	const { patient } = usePatient()
	const navigate = useNavigate()
	const [isTaring, setIsTaring] = useState<boolean>(false)
	const [action, setAction] = useState<ActionsToTake>("preload")
	const [data, setData] = useState<Measure[]>([])

	useEffect(() => {
		if (!patient) {
			navigateToMeasurement()
		}
	}, [])

	const navigateToMeasurement = useCallback(() => navigate("/measurement"), [])

	useEffect((): any => {
		const tareEvent = () => {
			console.log("backTare")
			counter.reset()
			setIsTaring(false)
			setAction("loaded")
		}
		socket.on("tare", tareEvent)
		return () => socket.off("tare", tareEvent)
	}, [socket])

	useEffect((): any => {
		const measurementEvent = ({ score }: Measure) => {
			const dataToPush: Measure = {
				score,
				times: counter.increment(),
			}
			console.log(dataToPush)
			setData(prev => [...prev, dataToPush])
		}

		socket.on("measurement", measurementEvent)
		return () => socket.off("measurement", measurementEvent)
	}, [socket])

	const handleCalibrate = () => {
		console.log("Emit evento para iniciar a calibragem!")
		setIsTaring(true)
		socket.emit("tare")
	}

	const handleStart = () => {
		const coffito = localStorage.getItem("@tcc:coffito")
		const patientId = patient?.id as string
		socket.emit("start", { patientId, coffito })
	}

	const formatDate = (date?: Date) => {
		if (date) {
			return new Date(date).toLocaleDateString("pt-BR")
		}
		return new Date().toLocaleDateString("pt-BR")
	}

	return (
		<div>
			<AreaDisplayChart dataValues={data} xAxis={"times"} areaValue={"score"} />
			<Box className={style.boxWrapper}>
				<div className={style.displayInfo}>
					<h2 className={style.tableHeader}>{patient?.name}</h2>
					<div className={style.tableWrapper}>
						<h4>Data de Nascimento: </h4>
						<p>{formatDate(patient?.birthday)}</p>
					</div>
					<div className={style.tableWrapper}>
						<h4>Data da Cirurgia:</h4>
						<p>{formatDate(patient?.surgery_date)}</p>
					</div>
				</div>
				<div>
					{isTaring ? (
						<ProgressCircle style={{ padding: "0 20px" }} />
					) : (
						<OpenIconSpeedDial status={action} />
					)}
				</div>
			</Box>
		</div>
	)
}
