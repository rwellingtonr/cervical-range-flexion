import React, { useState } from "react"
import Box from "@mui/material/Box"
import style from "./patientRegistration.module.scss"
import DefaultButton from "../../components/defaultButton.ts/defaultButton"
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material"

const inputStyle = {
    m: 1,
    borderRadius: "20px",
    background: "rgba(143, 218, 200, 0.2)",
    "& .MuiOutlinedInput-root": { borderRadius: "20px" },
}

const generos = ["none", "masculino", "feminino", "outro"]

function PatientRegistration() {
    const [gender, setGender] = useState<string>("")

    const handleGender = (e: SelectChangeEvent) => {
        const { value } = e.target
        setGender(value === "none" ? "" : value)
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
                onSubmit={console.log}
            >
                <div className={style.register}>
                    <h1>Cadastro de Paciente</h1>
                </div>
                <TextField
                    required
                    fullWidth
                    sx={inputStyle}
                    id="outlined-required"
                    label="{label}"
                    placeholder="{placeHolder}"
                    defaultValue=""
                    onChange={e => console.log(e.target.value)}
                />
                <div>aqui vai a data de nascimento e a data de cirurgia</div>
                <div className={style.lastRow}>
                    <TextField
                        required
                        sx={{ ...inputStyle, width: "300px" }}
                        id="outlined-required"
                        label="{label}"
                        placeholder="{placeHolder}"
                        defaultValue=""
                        onChange={e => console.log(e.target.value)}
                    />
                    <>
                        <FormControl sx={{ width: "150px", ...inputStyle }}>
                            <InputLabel id="demo-simple-select-label">Gênero</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="gender"
                                onChange={handleGender}
                            >
                                {generos.map((item, i) => (
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
