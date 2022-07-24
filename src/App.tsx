import React from "react"
import { BrowserRouter } from "react-router-dom"
import MainRoutes from "./routes"

export default function App() {
	return (
		<BrowserRouter>
			{" "}
			<MainRoutes />
		</BrowserRouter>
	)
}
