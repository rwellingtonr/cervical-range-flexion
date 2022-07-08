import React, { useEffect, useState } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import style from "./measurement.module.scss"
import { api } from "../../service/api"

type Patients = {
    id: string
    name: string
    cpf: string
    gender: string
    birthday: string
    surgery_date: Date
}

export default function Measurement() {
    const [patients, setPatients] = useState<Patients[]>([])

    useEffect(() => {
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
    return (
        <div className={style.measurementWrapper}>
            <Stack spacing={1} className={style.stack} sx={{ width: 450 }}>
                <Autocomplete
                    {...defaultProps}
                    id="auto-highlight"
                    autoHighlight
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
        </div>
    )
}
