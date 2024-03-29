import React, { useEffect, useState, useCallback } from "react"
import AreaDisplayChart from "../charts/areaDisplayChart"
import ProgressCircle from "../circularProgress"
import Box from "@mui/material/Box"
import style from "./realTime.module.scss"
import CustomizedSnackbars from "../alert/alert"
import AlertDialogSlide from "../measurementMovements"
import MeasurementCompleted from "../measurementCompleted"
import RealTimeButtonActions from "../realtimeActions"
import { socket } from "../../service/websocket"
import { usePatient } from "../../context/patient"
import { useNavigate } from "react-router-dom"
import { type Severity, useAlert } from "../../context/alert"
import { counter } from "../../utils/counter"
import { connected, disconnected } from "./indicator"
import type { Movement } from "../../interface/movement"
import ErrorSnackbar from "../serialPortError/errorSnackbar"

type Measure = {
	times: number
	score: number
}
export type ActionsToTake = "disconnected" | "loaded" | "ongoing"

export type ActionsToDo = "return" | "start" | "cancel" | "completed" | "connect"

type SerialMessage = {
	msg: string
	status: Severity
}
export type PatientMeasurement = {
	maxScore: number
	movement: Movement
	patientId: string
	crefito: string
}

export default function RealTime() {
	const navigate = useNavigate()

	const { patient } = usePatient()
	const { handleAlert } = useAlert()

	const [isTaring, setIsTaring] = useState<boolean>(false)
	const [openDialog, setOpenDialog] = useState<boolean>(false)
	const [action, setAction] = useState<ActionsToTake>("disconnected")
	const [data, setData] = useState<Measure[]>([])
	const [movement, setMovement] = useState<string>("")
	const [patientMeasurement, setPatientMeasurement] = useState<PatientMeasurement | null>(null)
	const [errorConnecting, setErrorConnecting] = useState<boolean>(false)

	const navigateToMeasurement = useCallback(() => navigate("/measurement"), [])
	useEffect(() => {
		if (!patient) navigateToMeasurement()
	}, [navigateToMeasurement])

	useEffect(() => {
		if (patient) {
			socket.emit("status")
		}
	}, [])

	useEffect(() => {
		const errorTaring = (taring: boolean) => {
			if (taring) {
				setIsTaring(false)
				setAction("disconnected")
				setErrorConnecting(true)
				socket.emit("disconnect-arduino")
			}
		}
		if (isTaring) {
			const ms = 10 * 1000 //10s
			const timeout = setTimeout(() => {
				errorTaring(isTaring)
			}, ms)
			return () => clearTimeout(timeout)
		}
	}, [isTaring])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	useEffect((): any => {
		const handleMessage = ({ msg, status }: SerialMessage) => {
			console.log(`Passou aqui, message: ${msg}`)
			if (status === "error") {
				setIsTaring(false)
				setAction("disconnected")
			}
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
			console.log("Finalizou")
			counter.reset()
			setIsTaring(false)
			setAction("loaded")
		}
		const handleCompleted = (payload: PatientMeasurement) => {
			setPatientMeasurement(payload)
			setAction("loaded")
		}

		socket.on("tare", tareEvent)
		socket.on("status", handleStatus)
		socket.on("measurement", measurementEvent)
		socket.on("message", handleMessage)
		socket.on("result", handleCompleted)
		return () => {
			socket.off("status", handleStatus)
			socket.off("message", handleMessage)
			socket.off("measurement", measurementEvent)
			socket.off("tare", tareEvent)
			socket.off("result", handleCompleted)
		}
	}, [socket])

	const connectArduino = () => {
		setIsTaring(true)
		socket.emit("connect-arduino")
	}

	const actions = {
		cancel: () => handleAbortProcess(),
		return: () => navigateToMeasurement(),
		connect: () => connectArduino(),
		start: () => handleStart(),
		completed: () => socket.emit("end-process"),
	}
	const handleAction = (action: ActionsToDo) => {
		const func = actions[action]
		if (!func) return
		func()
	}

	const formatDate = (date?: Date) => {
		if (date) return new Date(date).toLocaleDateString("pt-BR")
		return new Date().toLocaleDateString("pt-BR")
	}
	const handleStart = () => {
		setOpenDialog(true)
	}
	const handleCloseDialog = () => {
		setData([])
		setOpenDialog(false)
	}

	const handleMeasure = (movement: string) => {
		setAction("ongoing")
		setMovement(movement)
	}
	const handleAbortProcess = () => {
		socket.emit("abort-process")
		setAction("loaded")
		resetData()
	}

	const resetData = () => {
		setData([])
		setPatientMeasurement(null)
		counter.reset()
	}

	const closeMeasureResult = () => {
		resetData()
		handleAlert("Dados foram limpos", "info")
	}
	const handleCloseErrorSnackbar = () => {
		setErrorConnecting(false)
	}

	return patient ? (
		<div>
			<CustomizedSnackbars />
			{openDialog && (
				<AlertDialogSlide
					handleClose={handleCloseDialog}
					open={openDialog}
					handleMeasure={handleMeasure}
				/>
			)}
			{!!patientMeasurement && (
				<MeasurementCompleted
					open={!!patientMeasurement}
					handleClose={closeMeasureResult}
					patientMeasurement={patientMeasurement}
				/>
			)}
			{errorConnecting && (
				<ErrorSnackbar handleClose={handleCloseErrorSnackbar} open={errorConnecting} />
			)}
			<div style={movement ? {} : { visibility: "hidden", height: "200px" }}>
				<h2 style={{ textAlign: "center" }}>Movimento: {movement}</h2>
				<AreaDisplayChart dataValues={data} xAxis={"times"} areaValue={"score"} />
			</div>
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
	) : (
		<div></div>
	)
}
