import React from "react"
import style from "./measurement.module.scss"
import { Outlet } from "react-router-dom"

export default function Measurement() {
	return (
		<main className={style.measurementWrapper}>
			<div className={style.title}>
				<h1>Avaliação</h1>
			</div>

			<Outlet />
		</main>
	)
}
