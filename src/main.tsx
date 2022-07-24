import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import "virtual:fonts.css"
import AuthProvider from "./context/auth"
import PatientProvider from "./context/patient"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<PatientProvider>
				<App />
			</PatientProvider>
		</AuthProvider>
	</React.StrictMode>
)
