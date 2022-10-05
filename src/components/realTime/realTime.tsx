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
type ActionsToTake = "disconnected" | "loaded" | "done"

export type ActionsToDo = "return" | "start" | "save" | "cancel" | "reconnect"

type SerialMessage = {
	msg: string
	status: string
}

const counter = (() => {
	let i = 0

	function reset() {
		return (i = 0)
	}

	function increment() {
		return i++
	}

	return {
		reset,
		increment,
	}
})()
export default function RealTime() {
	const { patient } = usePatient()
	const navigate = useNavigate()
	const [isTaring, setIsTaring] = useState<boolean>(false)
	const [action, setAction] = useState<ActionsToTake>("disconnected")
	const [data, setData] = useState<Measure[]>([])
	const { handleAlert } = useAlert()

	const navigateToMeasurement = useCallback(() => navigate("/measurement"), [])
	useEffect(() => {
		if (!patient) navigateToMeasurement()
	}, [navigateToMeasurement])

	useEffect(() => {
		console.log("Aqui!")
		socket.emit("status")
	}, [])
	// useEffect((): any => {
	// 	const handleStatus = (payload: { status: ActionsToTake }) => {
	// 		setAction(payload.status)
	// 	}
	// 	socket.on("status", handleStatus)
	// 	return () => socket.off("status", handleStatus)
	// }, [socket])

	// useEffect((): any => {
	// 	const tareEvent = () => {
	// 		console.warn("backTare")
	// 		counter.reset()
	// 		setIsTaring(false)
	// 		setAction("loaded")
	// 	}
	// 	socket.on("tare", tareEvent)
	// 	return () => socket.off("tare", tareEvent)
	// }, [socket])

	// useEffect((): any => {
	// 	const measurementEvent = ({ score }: Measure) => {
	// 		const dataToPush: Measure = {
	// 			score,
	// 			times: counter.increment(),
	// 		}
	// 		setData(prev => [...prev, dataToPush])
	// 	}

	// 	socket.on("measurement", measurementEvent)
	// 	return () => socket.off("measurement", measurementEvent)
	// }, [socket])

	useEffect((): any => {
		const handleMessage = ({ msg, status }: SerialMessage) => {
			console.log(`Passou aqui, isTaring: ${isTaring}`)
			if (status === "error") setIsTaring(false)
			handleAlert(msg, status)
		}
		const measurementEvent = ({ score }: Measure) => {
			const dataToPush: Measure = {
				score,
				times: counter.increment(),
			}
			setData(prev => [...prev, dataToPush])
		}
		const handleStatus = (payload: { status: ActionsToTake }) => {
			setAction(payload.status)
		}
		const tareEvent = () => {
			console.warn("backTare")
			counter.reset()
			setIsTaring(false)
			setAction("loaded")
		}

		socket.on("tare", tareEvent)
		socket.on("status", handleStatus)
		socket.on("measurement", measurementEvent)
		socket.on("message", handleMessage)
		return () => {
			socket.off("status", handleStatus)
			socket.off("message", handleMessage)
			socket.off("measurement", measurementEvent)
			socket.off("tare", tareEvent)
		}
	}, [socket])

	// useEffect((): any => {
	// 	const handleEndProcess = () => {
	// 		setAction("done")
	// 		handleAlert("Processo finalizado", "info")
	// 	}
	// 	socket.on("end", handleEndProcess)
	// 	return () => socket.off("end", handleEndProcess)
	// }, [socket])

	const handleCalibrate = () => {
		setIsTaring(true)
		socket.emit("connect-arduino")
	}

	const handleStart = () => {
		const crefito = localStorage.getItem("@tcc:crefito")
		const patientId = patient?.id as string
		socket.emit("start", { patientId, crefito })
	}

	const actions = {
		return: () => navigateToMeasurement(),
		start: () => handleStart(),
		save: () => socket.emit("save"),
		cancel: () => socket.emit("abort"),
		reconnect: () => handleCalibrate(),
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
						<div className={style.actionsWrapper}>
							<OpenIconSpeedDial status={action} handleAction={handleAction} />
							<>
								<span
									style={{
										backgroundColor:
											action === "disconnected" ? "#bbb" : "#8fdac8",
									}}
									className={style.dot}
								/>
								<p>{action === "disconnected" ? "Desconectado" : "Ligado"}</p>
							</>
						</div>
					)}
				</div>
			</Box>
		</div>
	)
}
