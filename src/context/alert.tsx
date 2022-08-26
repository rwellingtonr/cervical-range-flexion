import React, { createContext, ReactNode, useContext, useState } from "react"

type AlertProvider = {
	children: ReactNode
}

type AlertContextValue = {
	error: ErrorType
	handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void
	handleAlert: (msg: string, type?: Severity) => void
}

type ErrorType = {
	message: string
	severity: Severity
}
type Severity = "error" | "info" | "success" | "warning"

const AlertContext = createContext({} as AlertContextValue)

export const useAlert = () => useContext(AlertContext)

const initialState = { message: "", severity: "error" } as ErrorType

export default function AlertProvider({ children }: AlertProvider) {
	const [error, setError] = useState<ErrorType>(initialState)

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") return

		setError(initialState)
	}
	const handleAlert = (msg: string, type: Severity = "error") => {
		setError({ message: msg, severity: type })
	}

	return (
		<AlertContext.Provider value={{ handleClose, error, handleAlert }}>
			{children}
		</AlertContext.Provider>
	)
}
