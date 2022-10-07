import * as React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import CancelIcon from "@mui/icons-material/Cancel"
import SendIcon from "@mui/icons-material/Send"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { TransitionProps } from "@mui/material/transitions"

type AlertDialogSlideProps = {
	open: boolean
	handleClose: () => void
}
interface ITransitionPros extends TransitionProps {
	children: React.ReactElement
}
type Movement = "flexion" | "lateral-let" | "lateral-right"
interface CervicalMovement {
	label: string
	movement: Movement
}

function TransitionRef(props: ITransitionPros, ref: React.Ref<unknown>) {
	const newProps = { ...props, timeout: 650 }
	return <Slide direction="up" ref={ref} {...newProps} />
}
const Transition = React.forwardRef(TransitionRef)

const cervicalMovement: CervicalMovement[] = [
	{ label: "Flexão", movement: "flexion" },
	{ label: "Flexão lateral esquerda", movement: "lateral-let" },
	{ label: "Flexão lateral direita", movement: "lateral-right" },
]
const flatProps = {
	options: cervicalMovement.map(option => option.label),
}
export default function AlertDialogSlide({ open, handleClose }: AlertDialogSlideProps) {
	return (
		<Box component={"div"}>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>Selecione o movimento à ser realizado</DialogTitle>
				<DialogContent>
					<Autocomplete
						{...flatProps}
						id="flat-demo"
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
						Aqui vai o GIF
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color="error" startIcon={<CancelIcon />} onClick={handleClose}>
						Cancelar
					</Button>
					<Button color="success" startIcon={<SendIcon />} onClick={handleClose}>
						Iniciar
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
