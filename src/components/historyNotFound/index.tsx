import React from "react"
import Box from "@mui/material/Box"
import style from "./index.module.scss"
import DefaultButton from "../defaultButton.ts/defaultButton"
import { Link } from "react-router-dom"

export default function HistoryNotFound() {
	return (
		<Box component={"div"} className={style.notFoundWrapper}>
			<h3 className={style.notFoundSubtitle}>
				Nenhuma coleta foi encontrada para esse paciente
			</h3>
			<div className={style.actionButtonWrapper}>
				<Link to={"/patientHistory"} style={{ textDecoration: "none" }}>
					<DefaultButton>Voltar</DefaultButton>
				</Link>
			</div>
		</Box>
	)
}
