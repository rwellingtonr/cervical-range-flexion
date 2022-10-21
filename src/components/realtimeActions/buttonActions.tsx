import React from "react"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CancelIcon from "@mui/icons-material/Cancel"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import SettingsInputHdmiIcon from "@mui/icons-material/SettingsInputHdmi"

const disconnectedActions = [
	{ icon: <SettingsInputHdmiIcon />, name: "Conectar", action: "connect" },
	{ icon: <KeyboardReturnIcon />, name: "Retornar", action: "return" },
]

const actionsLoaded = [
	{ icon: <PlayArrowIcon />, name: "Iniciar", action: "start" },
	{ icon: <KeyboardReturnIcon />, name: "Retornar", action: "return" },
]

const ongoing = [
	{ icon: <DoneAllIcon />, name: "Finalizar", action: "completed" },
	{ icon: <CancelIcon />, name: "Cancelar", action: "cancel" },
]

export const actionsToTake = {
	disconnected: disconnectedActions,
	loaded: actionsLoaded,
	ongoing,
}
