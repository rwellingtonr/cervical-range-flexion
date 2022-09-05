import React, { useEffect, useState, useCallback } from "react"
import AreaDisplayChart from "../charts/areaDisplayChart"
import ProgressCircle from "../circularProgress"
import Box from "@mui/material/Box"
import style from "./realTime.module.scss"
import { socket } from "../../service/websocket"
import { usePatient } from "../../context/patient"
import { useNavigate } from "react-router-dom"
import OpenIconSpeedDial from "../speedDial/speedDial"
import { useAlert } from "../../context/alert"
import CustomizedSnackbars from "../alert/alert"

type Measure = {
	times: number
	score: number
}
type ActionsToTake = "preload" | "loaded" | "done"

export type ActionsToDo = "return" | "tare" | "start" | "save" | "cancel" | "reconnect"

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
	const { handleAlert } = useAlert()

	const navigateToMeasurement = useCallback(() => navigate("/measurement"), [])
	useEffect(() => {
		if (!patient) navigateToMeasurement()
	}, [navigateToMeasurement])

	useEffect((): any => {
		const tareEvent = () => {
			console.warn("backTare")
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

	useEffect((): any => {
		const handleMessage = ({ msg }: { msg: string }) => {
			setIsTaring(false)
			setAction("preload")
			handleAlert(msg)
		}
		socket.on("error", handleMessage)
		return () => socket.off("error", handleMessage)
	}, [socket])

	const handleCalibrate = () => {
		setIsTaring(true)
		socket.emit("tare")
	}

	const handleStart = () => {
		const coffito = localStorage.getItem("@tcc:coffito")
		const patientId = patient?.id as string
		socket.emit("start", { patientId, coffito })
	}

	const actions = {
		return: () => navigateToMeasurement(),
		tare: () => handleCalibrate(),
		start: () => handleStart(),
		save: () => socket.emit("save"),
		cancel: () => socket.emit("abort"),
		reconnect: () => socket.emit("reconect-arduino"),
	}
	const handleAction = (action: ActionsToDo) => {
		const func = actions[action]
		if (!func) return
		func()
	}

	const formatDate = (date?: Date) => {
		if (date) {
			return new Date(date).toLocaleDateString("pt-BR")
		}
		return new Date().toLocaleDateString("pt-BR")
	}

	return (
		<div>
			<CustomizedSnackbars />
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
						<OpenIconSpeedDial status={action} handleAction={handleAction} />
					)}
				</div>
			</Box>
		</div>
	)
}
