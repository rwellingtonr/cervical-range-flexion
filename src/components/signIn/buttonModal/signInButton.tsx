import React, { FormEvent } from "react"
import Button from "@mui/material/Button"
import style from "./signInButton.module.scss"

type SignButton = {
    message: string
    handleClick: () => Promise<void>
}

function SignInButton({ message, handleClick }: SignButton) {
    return (
        <>
            <Button
                className={style.button}
                variant="contained"
                size="large"
                onClick={() => handleClick()}
            >
                {message}
            </Button>
        </>
    )
}

export default SignInButton
