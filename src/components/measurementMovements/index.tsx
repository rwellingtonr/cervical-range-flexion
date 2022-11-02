import * as React from "react"
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import CancelIcon from "@mui/icons-material/Cancel"
import SendIcon from "@mui/icons-material/Send"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import CervicalCardMedia from "./cervicalCardMedia"
import { socket } from "../../service/websocket"
import { usePatient } from "../../context/patient"
import DialogSlide from "../dialog/dialogSlide"
import { Movement } from "../../interface/movement"

type AlertDialogSlideProps = {
	open: boolean
	handleClose: () => void
	handleMeasure: (movement: string) => void
}

interface CervicalMovement {
	label: string
	movement: Movement
}

const cervicalMovement: CervicalMovement[] = [
	{ label: "Flexão", movement: "flexion" },
	{ label: "Flexão Rotação lateral esquerda", movement: "lateral-left" },
	{ label: "Flexão Rotação lateral direita", movement: "lateral-right" },
]
const flatProps = {
	options: cervicalMovement.map(option => option.label),
}

export default function AlertDialogSlide({
	open,
	handleClose,
	handleMeasure,
}: AlertDialogSlideProps) {
	const [label, setLabel] = React.useState<string>("")
	const { patient } = usePatient()

	const movementSelected = label ? cervicalMovement.find(item => item.label === label) : null

	const startMovement = () => {
		console.log(`Movimento ${movementSelected?.movement} ${patient?.id}`)
		if (movementSelected) {
			const crefito = localStorage.getItem("@tcc:crefito")
			socket.emit("start", {
				patientId: patient?.id,
				crefito,
				movement: movementSelected?.movement,
			})
			handleMeasure(movementSelected?.label)
		}
		handleClose()
	}

	const dialogProps = {
		title: "Selecione o movimento à ser realizado",
		handleClose,
		open,
	}
	return (
		<DialogSlide {...dialogProps}>
			<DialogContent>
				<Autocomplete
					{...flatProps}
					id="flat-demo"
					defaultChecked={false}
					onInputChange={(_, newInputValue) => setLabel(newInputValue)}
					renderInput={params => (
						<TextField
							{...params}
							label="Movimento"
							placeholder="Selecione o movimento a ser realizado"
							variant="standard"
						/>
					)}
				/>
				<DialogContentText id="alert-dialog-slide-description">
					{!!movementSelected && (
						<CervicalCardMedia movement={movementSelected.movement} />
					)}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{!!movementSelected && (
					<Button color="error" startIcon={<CancelIcon />} onClick={handleClose}>
						Cancelar
					</Button>
				)}
				{!!movementSelected && (
					<Button color="success" startIcon={<SendIcon />} onClick={startMovement}>
						Iniciar
					</Button>
				)}
			</DialogActions>
		</DialogSlide>
	)
}
