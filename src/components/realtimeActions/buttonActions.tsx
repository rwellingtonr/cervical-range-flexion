import React from "react"
import SaveIcon from "@mui/icons-material/Save"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CancelIcon from "@mui/icons-material/Cancel"
import SettingsInputHdmiIcon from "@mui/icons-material/SettingsInputHdmi"

const disconnectedActions = [
	{ icon: <SettingsInputHdmiIcon />, name: "Conectar", action: "reconnect" },
	{ icon: <KeyboardReturnIcon />, name: "Retornar", action: "return" },
]

const actionsLoaded = [
	{ icon: <PlayArrowIcon />, name: "Iniciar", action: "start" },
	{ icon: <KeyboardReturnIcon />, name: "Retornar", action: "return" },
]

const ongoing = [{ icon: <CancelIcon />, name: "Cancelar", action: "abort" }]

const actionsWhenDone = [
	{ icon: <CancelIcon />, name: "Cancelar", action: "cancel" },
	{ icon: <SaveIcon />, name: "Salvar", action: "save" },
]

export const actionsToTake = {
	disconnected: disconnectedActions,
	loaded: actionsLoaded,
	done: actionsWhenDone,
	ongoing,
}
