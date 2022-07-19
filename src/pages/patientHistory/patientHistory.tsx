import React, { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import DefaultButton from "../../components/defaultButton.ts/defaultButton"
import Autocomplete from "@mui/material/Autocomplete"
import InputDate from "../../components/inputDate/inputDate"
import style from "./patientHistory.module.scss"
import { api } from "../../service/api"
import { Stack } from "@mui/material"
import { Person } from "@mui/icons-material"

type Patients = {
    id: string
    name: string
    cpf: string
    gender: string
    birthday: string
    surgery_date: Date
}

type Dates = { initialDate: string; endDate: string }

function PatientHistory() {
    const isFirstRender = useRef<boolean>(true)
    const [patients, setPatients] = useState<Patients[]>([])
    const [patient, setPatient] = useState("")
    const [dates, setDates] = useState<Dates>({
        initialDate: "",
        endDate: "",
    })

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        retrievePatients()
            .then(response => setPatients(response))
            .catch(e => console.error(e))
    }, [])

    const retrievePatients = async () => {
        const res = await api.get<Patients[]>("/patient")
        return res.data
    }

    const defaultProps = {
        options: patients,
        getOptionLabel: (option: Patients) => option.name,
    }

    const handleSetDate = (type: string, date: string) => {
        const dateIso = new Date(date).toISOString()
        if (type === "Initial") {
            setDates({ ...dates, initialDate: dateIso })
            return
        }
        setDates({ ...dates, endDate: dateIso })
    }
    const handleSelect = (name: string) => {
        const person = patients.find(patient => patient.name === name)
        setPatient(person?.name as string)
    }

    return (
        <div className={style.divWrapper}>
            {" "}
            <div className={style.register}>
                <h1>Histórico de Paciente</h1>
            </div>
            <Stack spacing={1} className={style.stack} sx={{ width: 450 }}>
                <Autocomplete
                    {...defaultProps}
                    id="auto-highlight"
                    autoHighlight
                    onInputChange={(event, newInputValue) => handleSelect(newInputValue)}
                    renderInput={params => (
                        <TextField
                            {...params}
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "20px" },
                            }}
                            label="Paciente"
                            variant="outlined"
                        />
                    )}
                />
            </Stack>
            {patient && (
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
            )}
            {patient && (
                <div className={style.submit}>
                    <DefaultButton handleClick={console.log}>
                        <Person style={{ paddingRight: "10px" }} />
                        Selecionar
                    </DefaultButton>
                </div>
            )}
        </div>
    )
}

export default PatientHistory
