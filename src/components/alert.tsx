import * as React from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"

type Props = {
    severity: "error" | "info" | "success" | "warning"
    message: string
    handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void
    open: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />
})

const vertical = "bottom"
const horizontal = "right"

export default function CustomizedSnackbars({ severity, message, open, handleClose }: Props) {
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                key={vertical + horizontal}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
