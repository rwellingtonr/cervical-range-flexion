import React from "react"
import { Outlet } from "react-router-dom"
import spine from "../../assets/espinha.svg"
import style from "./signPage.module.scss"
import { Box } from "@mui/system"

export default function Sign() {
	return (
		<Box component="div" className={style.signWrapper}>
			<Box component="div">
				<span>
					<img className={style.image} src={spine} alt="Cervical" />
				</span>
			</Box>
			<div className={style.form}>
				<Outlet />
			</div>
		</Box>
	)
}
