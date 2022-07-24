import React, { useState } from "react"
import { Link } from "react-router-dom"
import DefaultButton from "../../components/defaultButton.ts/defaultButton"
import Person from "@mui/icons-material/Person"
import InputDate from "../../components/inputDate/inputDate"
import style from "./historySelect.module.scss"
import SelectPatient from "../stackSelect/selectPatient"
import { usePatient } from "../../context/patient"

type Dates = {
	initialDate: Date
	endDate: Date
}

export default function HistorySelect() {
	const { patient } = usePatient()
	const [dates, setDates] = useState({} as Dates)

	const handleSetDate = (type: string, date: string) => {
		if (date) {
			const time = new Date().toLocaleTimeString()
			const dateIso = new Date(`${date}:${time}`)
			if (type === "Initial") {
				setDates({ ...dates, initialDate: dateIso })
				return
			}
			setDates({ ...dates, endDate: dateIso })
		}
	}

	return (
		<div className={style.divWrapper}>
			{" "}
			<SelectPatient />
			{patient && (
				<div className={style.lastRow}>
					{" "}
					<InputDate
						handleAction={handleSetDate}
						name={"Initial"}
						label={"Data de início"}
					/>
					<InputDate
						handleAction={handleSetDate}
						name={"surgery"}
						label={"Data da cirurgia"}
					/>
				</div>
			)}
			{patient && (
				<div className={style.submit}>
					<Link
						style={{ textDecoration: "none" }}
						to={`/patientHistory/${patient.id}?startDate=${dates.initialDate}&endDate=${dates.endDate}`}
					>
						<DefaultButton>
							<Person style={{ paddingRight: "10px" }} />
							Selecionar
						</DefaultButton>
					</Link>
				</div>
			)}
		</div>
	)
}
