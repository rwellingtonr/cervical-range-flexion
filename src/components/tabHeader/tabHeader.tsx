import React, { useState, useEffect } from "react"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { Person, Analytics, AdUnits } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import style from "./tabHearder.module.scss"

enum TabsBar {
	patientRegistration,
	measurement,
	patientHistory,
}

type Tabs = "patientRegistration" | "measurement" | "patientHistory"

function a11yProps(index: any) {
	return {
		id: `action-tab-${index}`,
		"aria-controls": `action-tabpanel-${index}`,
	}
}

export default function FloatingActionButtonZoom() {
	const [value, setValue] = useState<number>(1)
	const navigate = useNavigate()

	useEffect(() => {
		const url = window.location.href
		const currentTab = url.split("/")[3] as Tabs
		if (!currentTab) return
		setValue(TabsBar[currentTab])
	}, [])

	const handleChange = (event: unknown, newValue: number) => {
		setValue(newValue)
		navigate(`/${TabsBar[newValue]}`)
	}

	const patient = () => {
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<Person style={{ padding: "0 10px" }} />
				Paciente
			</div>
		)
	}
	const measurement = () => {
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<Analytics style={{ padding: "0 10px" }} />
				Coleta
			</div>
		)
	}
	const history = () => {
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<AdUnits style={{ padding: "0 10px" }} />
				Histórico
			</div>
		)
	}

	return (
		<Box
			sx={{
				width: 500,
			}}
		>
			<AppBar sx={{ boxShadow: "none" }} position="relative" color="transparent">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="secondary"
					variant="fullWidth"
					aria-label="Seleção de ações"
					sx={{
						boxShadow: "none",
					}}
				>
					<Tab className={style.tabWrappper} label={patient()} {...a11yProps(0)} />
					<Tab className={style.tabWrappper} label={measurement()} {...a11yProps(1)} />
					<Tab className={style.tabWrappper} label={history()} {...a11yProps(2)} />
				</Tabs>
			</AppBar>
		</Box>
	)
}
