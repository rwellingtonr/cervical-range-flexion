import React, { useEffect, useRef, useState } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import style from "./measurement.module.scss"
import { api } from "../../service/api"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth"

type Patients = {
    id: string
    name: string
    cpf: string
    gender: string
    birthday: string
    surgery_date: Date
}

export default function Measurement() {
    const isFirstRender = useRef<boolean>(true)
    const [patients, setPatients] = useState<Patients[]>([])
    const navigate = useNavigate()
    const { signOut } = useAuth()

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        retrievePatients()
            .then(response => setPatients(response))
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

    const handleSelect = (name: string) => {
        const person = patients.find(patient => patient.name === name)
        navigate(`/measurement/${person?.id}`)
    }

    return (
        <main className={style.measurementWrapper}>
            <div className={style.register}>
                <h1>Avaliação</h1>
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
            <Outlet />
        </main>
    )
}
