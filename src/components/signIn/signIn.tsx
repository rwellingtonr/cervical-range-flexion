import Box from "@mui/material/Box"
import React, { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../context/auth"
import InputSignText from "./inputSignText"
import InputTxt from "./inputTxt"
import style from "./sign.module.scss"

export default function SignIn() {
    const { signIn } = useContext(AuthContext)
    const [coffito, setCoffito] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    // const [first, setfirst] = useState(second)

    const handleSignIn = async (event: FormEvent) => {
        try {
            event.preventDefault()

            await signIn({ coffito, password })
        } catch (error) {
            console.log("Error ao tentar fazer o logIn")
        }
    }

    return (
        <div className={style.formWrapper}>
            <Box
                component="form"
                className={style.form}
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <InputTxt
                        label="Coffito"
                        placeHolder="Informe seu Coffito"
                        fillIn={setCoffito}
                    />
                </div>
            </Box>
        </div>
    )
}
