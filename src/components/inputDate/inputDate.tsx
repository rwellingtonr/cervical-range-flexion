import TextField from "@mui/material/TextField"
import React from "react"

type Props = {
    handleAction: (key: string, value: string) => void
    label: string
    name: string
}

export default function InputDate({ handleAction, name, label }: Props) {
    return (
        <TextField
            id="date"
            label={label}
            type="date"
            onChange={e => handleAction(name, e.target.value)}
            sx={{
                m: 1,
                borderRadius: "20px",
                width: 250,
                background: "rgba(143, 218, 200, 0.2)",
                "& .MuiOutlinedInput-root": { borderRadius: "20px" },
            }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}
