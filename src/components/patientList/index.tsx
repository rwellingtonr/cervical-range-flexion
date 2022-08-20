import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import PersonIcon from "@mui/icons-material/Person"
import Avatar from "@mui/material/Avatar"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import Tooltip from "@mui/material/Tooltip"
import { green } from "@mui/material/colors"
import { styled } from "@mui/material/styles"
import { usePatient } from "../../context/patient"
import { api } from "../../service/api"

type PatientList = { handleClose: () => void; open: boolean }

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

export interface DialogTitleProps {
	id: string
	children?: React.ReactNode
	onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: theme => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	)
}

export default function PatientList({ handleClose, open }: PatientList) {
	const { patients, retrievePatients } = usePatient()
	const [deletedPatients, setDeletedPatients] = useState<string[]>([])

	useEffect(() => {
		retrievePatients().catch(e => console.error(e))
	}, [open === true])

	const handleRemoveUser = async (patientId: string) => {
		try {
			await api.delete(`/patient/${patientId}`)
			setDeletedPatients(prev => [...prev, patientId])
		} catch (error) {
			console.error("Erro ao apagar usuário")
		}
	}

	const patientList = deletedPatients.length
		? patients.filter(p => !deletedPatients.includes(p.id))
		: patients

	return (
		<div>
			<BootstrapDialog
				maxWidth={"sm"}
				fullWidth={true}
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
					Pacientes Cadastrados
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						{patientList.map(patient => (
							<ListItem button key={patient.id}>
								<ListItemAvatar>
									<Avatar sx={{ bgcolor: green[100], color: green[600] }}>
										<PersonIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={patient.name} />
								<Tooltip title="Remover paciente">
									<IconButton onClick={() => handleRemoveUser(patient.id)}>
										<CloseIcon sx={{ height: "15px", color: "#861515" }} />
									</IconButton>
								</Tooltip>
							</ListItem>
						))}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Fechar
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</div>
	)
}
