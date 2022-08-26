import React, { useMemo } from "react"
import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import SaveIcon from "@mui/icons-material/Save"
import EditIcon from "@mui/icons-material/Edit"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import RepeatIcon from "@mui/icons-material/Repeat"
import style from "./speedDial.module.scss"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CancelIcon from "@mui/icons-material/Cancel"
import ScaleIcon from "@mui/icons-material/Scale"
import type { ActionsToDo } from "../realTime/realTime"

type SpeedDialType = {
	status: "preload" | "loaded" | "done"
	handleAction: (action: ActionsToDo) => void
}

const actionPreLoad = [
	{ icon: <KeyboardReturnIcon />, name: "Retornar", action: "return" },
	{ icon: <ScaleIcon />, name: "Calibrar", action: "tare" },
]

const actionsLoaded = [
	{ icon: <KeyboardReturnIcon />, name: "Retornar", action: "return" },
	{ icon: <PlayArrowIcon />, name: "Iniciar", action: "start" },
	{ icon: <ScaleIcon />, name: "Recalibrar", action: "tare" },
]

const actionsWhenDone = [
	{ icon: <SaveIcon />, name: "Salvar", action: "save" },
	{ icon: <CancelIcon />, name: "Cancelar", action: "cancel" },
]

const actionsToTake = {
	preload: actionPreLoad,
	loaded: actionsLoaded,
	done: actionsWhenDone,
}

export default function OpenIconSpeedDial({ status, handleAction }: SpeedDialType) {
	const actions = useMemo(() => actionsToTake[status], [status])

	return (
		<Box className={style.dialWrapper}>
			<SpeedDial
				ariaLabel="SpeedDial openIcon example"
				className={style.speedDial}
				sx={{
					"& .css-118zhtq-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab": {
						background: "#8fdac8",
					},
					"& .css-118zhtq-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab:hover": {
						background: "#6DA699",
					},
				}}
				icon={<SpeedDialIcon openIcon={<EditIcon />} />}
			>
				{actions.map(item => (
					<SpeedDialAction
						key={item.name}
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={() => handleAction(item.action as ActionsToDo)}
					/>
				))}
			</SpeedDial>
		</Box>
	)
}
