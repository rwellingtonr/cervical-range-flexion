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
import CircularProgress from "@mui/material/CircularProgress"

type AlertDialogSlideProps = {
	open: boolean
	handleClose: () => void
}
interface ITransitionPros extends TransitionProps {
	children: React.ReactElement
}
interface FilmOptionType {
	label: string
	year: number
}

const Transition = React.forwardRef(function Transition(
	props: ITransitionPros,
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})
const top100Films = [
	{ label: "The Shawshank Redemption", year: 1994 },
	{ label: "The Godfather", year: 1972 },
	{ label: "The Godfather: Part II", year: 1974 },
]

function sleep(delay = 0) {
	return new Promise(resolve => {
		setTimeout(resolve, delay)
	})
}

export default function AlertDialogSlide({ open, handleClose }: AlertDialogSlideProps) {
	const defaultProps = {
		options: top100Films,
		getOptionLabel: (option: FilmOptionType) => option.label,
	}
	const flatProps = {
		options: top100Films.map(option => option.label),
	}
	const [value, setValue] = React.useState<FilmOptionType | null>(null)

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
							<TextField {...params} label="flat" variant="standard" />
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
