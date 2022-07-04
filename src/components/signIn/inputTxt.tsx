import React from "react"
import TextField from "@mui/material/TextField"
import style from "./sign.module.scss"
type Props = {
    label: string
    placeHolder: string
    fillIn: (event: string) => void
}

export default function InputTxt({ label, placeHolder, fillIn }: Props) {
    return (
        <>
            {" "}
            <TextField
                required
                id="outlined-required"
                label={label}
                placeholder={placeHolder}
                defaultValue=""
                className={style.inputTxt}
                onChange={e => fillIn(e.target.value)}
            />
        </>
    )
}
