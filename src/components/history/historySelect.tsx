import React, { useEffect, useRef, useState } from "react"
import { api } from "../../service/api"
import { useAuth } from "../../context/auth"
import { useNavigate } from "react-router-dom"
import TextField from "@mui/material/TextField"
import DefaultButton from "../../components/defaultButton.ts/defaultButton"
import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import Person from "@mui/icons-material/Person"
import InputDate from "../../components/inputDate/inputDate"

import style from "./historySelect.module.scss"
import { Link } from "react-router-dom"

type Patients = {
    id: string
    name: string
    cpf: string
    gender: string
    birthday: string
    surgery_date: Date
}
type Dates = {
    initialDate: Date
    endDate: Date
}

export default function HistorySelect() {
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const isFirstRender = useRef<boolean>(true)
    const [patients, setPatientIds] = useState<Patients[]>([])
    const [patientId, setPatientId] = useState("")
    const [dates, setDates] = useState<Dates>({
        initialDate: new Date(),
        endDate: new Date(),
    })
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        retrievePatients()
            .then(response => setPatientIds(response))
            .catch(e => {
                if (e.response.status === 401) {
                    signOut()
                    navigate("/", { replace: true })
                }
                console.error(e)
            })
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
        const time = new Date().toLocaleTimeString()
        const dateIso = new Date(`${date}:${time}`)
        if (type === "Initial") {
            setDates({ ...dates, initialDate: dateIso })
            return
        }
        setDates({ ...dates, endDate: dateIso })
    }
    const handleSelect = (name: string) => {
        const person = patients.find(patient => patient.name === name)
        setPatientId(person?.id as string)
    }

    return (
        <div className={style.divWrapper}>
            {" "}
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
            {patientId && (
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
            {patientId && (
                <div className={style.submit}>
                    <Link
                        style={{ textDecoration: "none" }}
                        to={`/patientHistory/${patientId}?startDate=${dates.initialDate}&endDate=${dates.endDate}`}
                    >
                        <DefaultButton handleClick={console.log}>
                            <Person style={{ paddingRight: "10px" }} />
                            Selecionar
                        </DefaultButton>
                    </Link>
                </div>
            )}
        </div>
    )
}
