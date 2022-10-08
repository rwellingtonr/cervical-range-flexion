import React from "react"
import DialogSlide from "../dialog/dialogSlide"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import CancelIcon from "@mui/icons-material/Cancel"
import SendIcon from "@mui/icons-material/Send"
import { usePatient } from "../../context/patient"
import { api } from "../../service/api"
import type { PatientMeasurement } from "../realTime/realTime"
import { useAlert } from "../../context/alert"

type MCProps = {
	handleClose: () => void
	patientMeasurement: PatientMeasurement | null
	open: boolean
}

export default function MeasurementCompleted({ handleClose, open, patientMeasurement }: MCProps) {
	const { patient } = usePatient()
	const { handleAlert } = useAlert()

	const dialogProps = {
		title: "Resultados",
		handleClose,
		open,
	}

	async function saveData() {
		try {
			await api.post("/history", patientMeasurement)
			handleAlert("Dados salvos", "success")
		} catch (err) {
			console.error
			handleAlert("Erro ao salvar os dados")
		}
		handleClose()
	}

	return (
		<DialogSlide {...dialogProps}>
			<DialogContent>
				<div style={{ width: "300px" }}>
					<h4 style={{ padding: "10px 0" }}>Paciente: {patient?.name}</h4>

					<p>
						Maior valor atingido:{" "}
						<span style={{ color: "184d20" }}>
							<strong>{patientMeasurement?.maxScore}</strong>
						</span>
					</p>
				</div>
			</DialogContent>
			<DialogActions>
				<Button color="error" startIcon={<CancelIcon />} onClick={handleClose}>
					Cancelar
				</Button>

				<Button color="success" startIcon={<SendIcon />} onClick={saveData}>
					Salvar
				</Button>
			</DialogActions>
		</DialogSlide>
	)
}
