import React, { useState } from "react"
import ProgressCircle from "../../components/circularProgress"
import DefaultButton from "../../components/defaultButton.ts/defaultButton"
import { socket } from "../../service/websocket"

export default function RealTime() {
	const [isTaring, setIsTaring] = useState<boolean>(false)

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
	return (
		<div>
			{isTaring && <ProgressCircle style={{ padding: "0 20px" }} />}

			<DefaultButton handleClick={handleCalibrate}> Calibrar </DefaultButton>
		</div>
	)
}
