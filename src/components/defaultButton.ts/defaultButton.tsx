import React, { ReactNode } from "react"
import Button from "@mui/material/Button"
import style from "./defaultButton.module.scss"

type DfButton = {
    handleClick?: () => void
    children: ReactNode
}

export default function DefaultButton({ children, handleClick }: DfButton) {
    return (
        <Button
            type="submit"
            className={style.Button}
            variant="contained"
            size="large"
            onClick={handleClick}
        >
            {children}
        </Button>
    )
}
