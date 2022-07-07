import React, { FormEvent, useContext, useState } from "react"
import Box from "@mui/material/Box"
import { AuthContext } from "../../context/auth"
import InputTxt from "./inputTxt"
import style from "./sign.module.scss"
import InputPassword from "./inputPassword"
import Button from "@mui/material/Button"
import SignInButton from "./buttonModal/signInButton"

export default function SignIn() {
    const { signIn } = useContext(AuthContext)
    const [coffito, setCoffito] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSignIn = async () => {
        try {
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
                    "& .MuiTextField-root": {
                        m: 0,
                        width: "350px",
                        maxWidth: "100%",
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <h1>Começar</h1>
                </div>

                <InputTxt label="Coffito" placeHolder="Informe seu Coffito" fillIn={setCoffito} />

                <InputPassword setPassword={setPassword} password={password} />

                <SignInButton message={"Conectar"} handleClick={handleSignIn} />
            </Box>
        </div>
    )
}
