import React, { useMemo } from "react"
import { actionsToTake } from "./buttonActions"
import type { ActionsToDo } from "../realTime/realTime"
import style from "./index.module.scss"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

type SpeedDialType = {
	status: "disconnected" | "loaded" | "done"
	handleAction: (action: ActionsToDo) => void
}

export default function RealTimeButtonActions({ status, handleAction }: SpeedDialType) {
	const actions = useMemo(() => actionsToTake[status], [status])

	return (
		<Box component={"div"}>
			<Stack direction="column" spacing={1}>
				{actions.map(item => (
					<Button
						key={item.name}
						variant="outlined"
						startIcon={item.icon}
						onClick={() => handleAction(item.action as ActionsToDo)}
					>
						{item.name}
					</Button>
				))}
			</Stack>
		</Box>
	)
}
