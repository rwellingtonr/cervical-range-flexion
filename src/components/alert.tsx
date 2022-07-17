import * as React from "react"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Stack from "@mui/material/Stack"

interface IAlert {
    type: Alerts
    message: string
}

type Alerts = "error" | "warning" | "success" | "info"

export default function DescriptionAlerts({ type, message }: IAlert) {
    const selectAlert = (type: Alerts) => {
        switch (type) {
            case "error":
                return (
                    <Alert severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        {message} — <strong>Revise</strong>
                    </Alert>
                )

            case "info":
                return (
                    <Alert severity="info">
                        <AlertTitle>Informação</AlertTitle>
                        {message} — <strong>Informativo!</strong>
                    </Alert>
                )

            case "warning":
                return (
                    <Alert severity="warning">
                        <AlertTitle>Alerta</AlertTitle>
                        {message} — <strong>Atenção!</strong>
                    </Alert>
                )
            case "success":
                return (
                    <Alert severity="success">
                        <AlertTitle>Sucesso</AlertTitle>
                        {message} — <strong>OK</strong>
                    </Alert>
                )

            default:
                return <></>
        }
    }

    return (
        <Stack sx={{ width: "100%" }} spacing={2}>
            {selectAlert(type)}
        </Stack>
    )
}
