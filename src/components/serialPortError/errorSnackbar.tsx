import React from "react"
import DialogSlide from "../dialog/dialogSlide"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import CancelIcon from "@mui/icons-material/Cancel"

type ErrorSnackbarProps = {
	open: boolean
	handleClose: () => void
}

export default function ErrorSnackbar({ handleClose, open }: ErrorSnackbarProps) {
	const dialogProps = {
		title: "Erro na Conexão",
		handleClose,
		open,
	}

	return (
		<DialogSlide {...dialogProps}>
			<DialogContent>
				<div style={{ width: "300px" }}>
					<h4>Erro ao conectar com o arduino!</h4>

					<p>1. Tente clicar em conectar, novamente</p>
					<p>2. Verifique as conexões elétricas</p>
				</div>
			</DialogContent>
			<DialogActions>
				<Button color="error" startIcon={<CancelIcon />} onClick={handleClose}>
					Fechar
				</Button>
			</DialogActions>
		</DialogSlide>
	)
}
