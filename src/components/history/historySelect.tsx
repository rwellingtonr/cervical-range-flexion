import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DefaultButton from "../../components/defaultButton.ts/defaultButton"
import Person from "@mui/icons-material/Person"
import InputDate from "../../components/inputDate/inputDate"
import style from "./historySelect.module.scss"
import SelectPatient from "../select/selectPatient"
import { usePatient } from "../../context/patient"
import SelectMovement from "../select/selectMovement"
import { useAlert } from "../../context/alert"
import CustomizedSnackbars from "../alert/alert"
import { Movement } from "../../interface/movement"

type Dates = {
	initialDate: Date
	endDate: Date
}

export default function HistorySelect() {
	const navigate = useNavigate()
	const { patient, setPatient } = usePatient()
	const { handleAlert } = useAlert()
	const [dates, setDates] = useState({} as Dates)
	const [movement, setMovement] = useState<Movement>()

	useEffect(() => setPatient(null), [])

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
	const handleClick = () => {
		if (movement) {
			const queryDate = `startDate=${dates.initialDate}&endDate=${dates.endDate}`
			const queryMovement = `movement=${movement}`
			return navigate(`/patientHistory/${patient?.id}?${queryDate}&${queryMovement}`)
		}
		handleAlert("Selecione um movimento", "warning")
	}

	return (
		<div className={style.divWrapper}>
			<CustomizedSnackbars />
			<SelectPatient />
			{patient && <SelectMovement setMovement={setMovement} />}
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
					<DefaultButton handleClick={handleClick}>
						<Person style={{ paddingRight: "10px" }} />
						Selecionar
					</DefaultButton>
				</div>
			)}
		</div>
	)
}
