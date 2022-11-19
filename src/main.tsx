import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import "virtual:fonts.css"
import AuthProvider from "./context/auth"
import PatientProvider from "./context/patient"
import AlertProvider from "./context/alert"
import { ThemeProvider } from "@mui/material"
import { theme } from "./styles/theme"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ThemeProvider theme={theme}>
		<AuthProvider>
			<PatientProvider>
				<AlertProvider>
					<App />
				</AlertProvider>
			</PatientProvider>
		</AuthProvider>
	</ThemeProvider>
)
