import React from "react"
import TextField from "@mui/material/TextField"
type Props = {
    label: string
    placeHolder: string
    fillIn: (event: string) => void
}

export default function InputTxt({ label, placeHolder, fillIn }: Props) {
    return (
        <div>
            {" "}
            <TextField
                required
                sx={{ m: 1, borderRadius: "10px", background: "#ffff" }}
                id="outlined-required"
                label={label}
                placeholder={placeHolder}
                defaultValue=""
                onChange={e => fillIn(e.target.value)}
            />
        </div>
    )
}
