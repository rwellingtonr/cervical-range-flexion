import React, { useMemo } from "react"
import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import SaveIcon from "@mui/icons-material/Save"
import EditIcon from "@mui/icons-material/Edit"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import RepeatIcon from "@mui/icons-material/Repeat"

type SpeedDial = {
	status: "preload" | "loaded"
}

const actionPreLoad = [
	{ icon: <KeyboardReturnIcon />, name: "Retornar" },
	{ icon: <SaveIcon />, name: "Save" },
	{ icon: <RepeatIcon />, name: "Refazer" },
]

const actionsLoaded = [
	{ icon: <KeyboardReturnIcon />, name: "Retornar" },
	{ icon: <SaveIcon />, name: "Save" },
	{ icon: <RepeatIcon />, name: "Refazer" },
]

const actionsToTake = {
	preload: actionPreLoad,
	loaded: actionsLoaded,
}

export default function OpenIconSpeedDial({ status }: SpeedDial) {
	const actions = useMemo(() => actionsToTake[status], [status])

	return (
		<Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
			<SpeedDial
				ariaLabel="SpeedDial openIcon example"
				sx={{ position: "absolute", bottom: 16, right: 16 }}
				icon={<SpeedDialIcon openIcon={<EditIcon />} />}
			>
				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
					/>
				))}
			</SpeedDial>
		</Box>
	)
}
