import React, { FormEvent, useState } from "react"
import Box from "@mui/material/Box"
import style from "./patientRegistration.module.scss"
import DefaultButton from "../../components/defaultButton.ts/defaultButton"
import CustomizedSnackbars from "../../components/alert/alert"
import InputDate from "../../components/inputDate/inputDate"
import PatientList from "../../components/patientList"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { api } from "../../service/api"
import { Person } from "@mui/icons-material"
import { useAlert } from "../../context/alert"

type Patient = {
	cpf: string
	name: string
	gender: string
	surgery_date: Date
	birthday: Date
}

const inputStyle = {
	m: 1,
	borderRadius: "20px",
	background: "rgba(143, 218, 200, 0.2)",
}

const genders = ["masculino", "feminino", "outro"]

function PatientRegistration() {
	const [name, setName] = useState("")
	const [cpf, setCpf] = useState("")
	const [gender, setGender] = useState("")
	const [surgeryDate, setSurgeryDate] = useState<Date>(new Date())
	const [birthday, setBirthday] = useState<Date>(new Date())
	const [listPatients, setListPatients] = useState(false)

	const { handleAlert } = useAlert()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			if (!name.trim() && !cpf.trim()) {
				handleAlert("Campos obrigatórios", "warning")
				return
			}

			const patient: Patient = {
				name,
				cpf,
				gender,
				birthday,
				surgery_date: surgeryDate,
			}

			await api.post("/patient", patient)
			cleanUp()
			handleAlert("Cadastrado com sucesso", "success")
		} catch (err) {
			console.error(err)
			handleAlert("Erro ao cadastrar usuário")
		}
	}

	const cleanUp = () => {
		setName("")
		setCpf("")
		setGender("")
		setSurgeryDate(new Date())
		setBirthday(new Date())
	}

	const handleSetDate = (type: string, date: string) => {
		const time = new Date().toLocaleTimeString()
		const dateIso = new Date(`${date}:${time}`)
		if (type === "birthday") {
			setBirthday(dateIso)
			return
		}
		setSurgeryDate(dateIso)
	}

	const handleClose = () => {
		setListPatients(false)
	}

	return (
		<>
			<CustomizedSnackbars />
			<main className={style.divWrapper}>
				<Box
					component="form"
					className={style.formWrapper}
					sx={{
						"& .MuiTextField-root": {
							m: 1,
							maxWidth: "100%",
						},
					}}
					noValidate
					autoComplete="off"
					onSubmit={handleSubmit}
				>
					<div className={style.register}>
						<h1>Cadastro de Paciente</h1>
					</div>
					<TextField
						required
						fullWidth
						sx={{ ...inputStyle, "& .MuiOutlinedInput-root": { borderRadius: "20px" } }}
						id="outlined-required"
						value={name}
						label="Nome"
						placeholder="Entre o nome do paciente"
						onChange={e => setName(e.target.value)}
					/>
					<div className={style.lastRow}>
						{" "}
						<InputDate
							handleAction={handleSetDate}
							name={"birthday"}
							label={"Data de nascimento"}
						/>
						<InputDate
							handleAction={handleSetDate}
							name={"surgery"}
							label={"Data da cirurgia"}
						/>
					</div>
					<div className={style.lastRow}>
						<TextField
							required
							sx={{
								...inputStyle,
								"& .MuiOutlinedInput-root": { borderRadius: "20px" },
								width: 280,
							}}
							id="outlined-required"
							value={cpf}
							label="CPF"
							placeholder="Entre o CPF do paciente"
							name="cpf"
							onChange={e => setCpf(e.target.value)}
						/>
						<>
							<FormControl
								sx={{
									width: 170,
									...inputStyle,
									"& .MuiOutlinedInput-root": { borderRadius: "20px" },
								}}
							>
								<InputLabel id="demo-simple-select-label">Gênero</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={gender}
									label="gender"
									name="gender"
									onChange={e => setGender(e.target.value)}
								>
									{genders.map((item, i) => (
										<MenuItem key={i} value={item}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</>
					</div>
					<div className={style.submit}>
						<div>
							<DefaultButton type="button" handleClick={() => setListPatients(true)}>
								<FormatListBulletedIcon style={{ paddingRight: "10px" }} />
								Pacientes
							</DefaultButton>
						</div>
						<div>
							<DefaultButton>
								{" "}
								<Person style={{ paddingRight: "10px" }} />
								Cadastrar
							</DefaultButton>
						</div>
					</div>
				</Box>
				<PatientList handleClose={handleClose} open={listPatients} />
			</main>
		</>
	)
}

export default PatientRegistration
