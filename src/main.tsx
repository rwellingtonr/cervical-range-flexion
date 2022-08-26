import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import "virtual:fonts.css"
import AuthProvider from "./context/auth"
import PatientProvider from "./context/patient"
import AlertProvider from "./context/alert"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AuthProvider>
		<PatientProvider>
			<AlertProvider>
				<App />
			</AlertProvider>
		</PatientProvider>
	</AuthProvider>
)
