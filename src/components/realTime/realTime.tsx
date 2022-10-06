import React, { useEffect, useState, useCallback } from "react"
import { socket } from "../../service/websocket"
import { usePatient } from "../../context/patient"
import { useNavigate } from "react-router-dom"
import { useAlert } from "../../context/alert"
import AreaDisplayChart from "../charts/areaDisplayChart"
import ProgressCircle from "../circularProgress"
import Box from "@mui/material/Box"
import style from "./realTime.module.scss"
import CustomizedSnackbars from "../alert/alert"
import RealTimeButtonActions from "../realtimeActions"
import { counter } from "../../utils/counter"
import { connected, disconnected } from "./indicator"

type Measure = {
	times: number
	score: number
}
type ActionsToTake = "disconnected" | "loaded" | "done"

type Movement = "flexion" | "lateral-let" | "lateral-right"

export type ActionsToDo = "return" | "start" | "save" | "cancel" | "reconnect"

type SerialMessage = {
	msg: string
	status: string
}

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
			console.warn("Finalizou")
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

	const handleCalibrate = () => {
		setIsTaring(true)
		socket.emit("connect-arduino")
	}

	const handleStart = (movement: Movement) => {
		const crefito = localStorage.getItem("@tcc:crefito")
		const patientId = patient?.id as string
		socket.emit("start", { patientId, crefito, movement })
	}

	const actions = {
		return: () => navigateToMeasurement(),
		start: () => handleStart("flexion"),
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
							<RealTimeButtonActions status={action} handleAction={handleAction} />
							<div className={style.indicatorWrapper}>
								<span
									style={action === "disconnected" ? disconnected : connected}
									className={style.dot}
								/>
								<p>{action === "disconnected" ? "Desconectado" : "Ligado"}</p>
							</div>
						</div>
					)}
				</div>
			</Box>
		</div>
	)
}
