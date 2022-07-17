import React, { ChangeEvent, FormEvent, useReducer, useState } from "react"
import Box from "@mui/material/Box"
import style from "./patientRegistration.module.scss"
import DefaultButton from "../../components/defaultButton.ts/defaultButton"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { api } from "../../service/api"

type Patient = {
    cpf: string
    name: string
    gender: string
    surgery_date: string
    birthday: string
}

const inputStyle = {
    m: 1,
    borderRadius: "20px",
    background: "rgba(143, 218, 200, 0.2)",
    "& .MuiOutlinedInput-root": { borderRadius: "20px" },
}

const dateStyles = { ...inputStyle, width: 250 }

const genders = ["masculino", "feminino", "outro"]

const defaultDateValue = "1990-01-01"

function PatientRegistration() {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [gender, setGender] = useState("")
    const [surgeryDate, setSurgeryDate] = useState(defaultDateValue)
    const [birthday, setBirthday] = useState(defaultDateValue)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!name.trim() && !cpf.trim()) return

        try {
            const patient: Patient = {
                name,
                cpf,
                gender,
                birthday,
                surgery_date: surgeryDate,
            }

            const res = await api.post("/patient", patient)
            cleanUp()
            alert(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const cleanUp = () => {
        setName("")
        setCpf("")
        setGender("")
        setSurgeryDate(defaultDateValue)
        setBirthday(defaultDateValue)
    }

    const handleSetDate = (type: string, date: string) => {
        const dateIso = new Date(date).toISOString()
        if (type === "birthday") {
            setBirthday(dateIso)
            return
        }
        setSurgeryDate(dateIso)
    }

    return (
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
                    sx={inputStyle}
                    id="outlined-required"
                    value={name}
                    label="Nome"
                    placeholder="Entre o nome do paciente"
                    defaultValue=""
                    onChange={e => setName(e.target.value)}
                />
                <div className={style.lastRow}>
                    {" "}
                    <TextField
                        id="date"
                        label="Data de nascimento"
                        type="date"
                        value={birthday}
                        sx={dateStyles}
                        onChange={e => handleSetDate("birthday", e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="Data da cirurgia"
                        type="date"
                        value={surgeryDate}
                        onChange={e => handleSetDate("surgery", e.target.value)}
                        sx={dateStyles}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className={style.lastRow}>
                    <TextField
                        required
                        sx={{ ...inputStyle, width: 280 }}
                        id="outlined-required"
                        value={cpf}
                        label="CPF"
                        placeholder="Entre o CPF do paciente"
                        defaultValue=""
                        name="cpf"
                        onChange={e => setCpf(e.target.value)}
                    />
                    <>
                        <FormControl sx={{ width: 170, ...inputStyle }}>
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
                <DefaultButton handleClick={console.log}>Cadastrar</DefaultButton>
            </Box>
        </main>
    )
}

export default PatientRegistration
