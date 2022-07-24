import React, { useEffect, useState } from "react"
import AreaDisplayChart from "../charts/areaDisplayChart"
import ProgressCircle from "../circularProgress"
import DefaultButton from "../defaultButton.ts/defaultButton"
import Box from "@mui/material/Box"
import { socket } from "../../service/websocket"
import style from "./realTime.module.scss"
import { usePatient } from "../../context/patient"
import { useNavigate } from "react-router-dom"

export default function RealTime() {
	const { patient } = usePatient()
	const navigate = useNavigate()
	const [isTaring, setIsTaring] = useState<boolean>(false)
	const [data, setData] = useState([])

	useEffect(() => {
		if (!patient) {
			navigate("/measurement")
		}
	}, [])

	const handleCalibrate = () => {
		console.log("Emit evento para iniciar a calibragem!")
		setIsTaring(true)
		socket.emit("tare")
	}

	socket.on("tare", () => {
		console.log("backTare")
		setIsTaring(false)
		// navigate('/iniciar a mesurar')
	})
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("pt-BR")
	}

	return (
		<div>
			<AreaDisplayChart dataValues={data} xAxis={"measurement_date"} areaValue={"score"} />
			<Box className={style.boxWrapper}>
				<div className={style.displayInfo}>
					<h2 className={style.tableHeader}>{patient?.name}</h2>
					<div className={style.tableWrapper}>
						<h4>Data de Nascimento: </h4>
						<p>{formatDate(patient?.birthday as Date)}</p>
					</div>
					<div className={style.tableWrapper}>
						<h4>Data da Cirurgia:</h4>
						<p>{formatDate(patient?.surgery_date as Date)}</p>
					</div>
				</div>
				<div>
					{isTaring && <ProgressCircle style={{ padding: "0 20px" }} />}
					<DefaultButton handleClick={handleCalibrate}> Calibrar </DefaultButton>
				</div>
			</Box>
		</div>
	)
}
