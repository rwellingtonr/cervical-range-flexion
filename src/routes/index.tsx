import React from "react"
import { Routes, Route } from "react-router-dom"
import HomeIndex from "../pages/home/homeIndex"
import Home from "../pages/home/home"
import Sign from "../pages/sign/sign"
import SignOption from "../pages/sign/signOption"
import PatientHistory from "../pages/patientHistory/patientHistory"
import PatientRegistration from "../pages/patientRegistration/patientRegistration"
import RequireAuth from "../components/requireAuth"
import Measurement from "../pages/measurement/measurement"
import RealTime from "../pages/charts/realTime"
import HistorySelect from "../components/history/historySelect"
import HistoryChart from "../components/history/historyChart"
import MeasurementIndex from "../components/measurement/measurementIndex"

export default function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />}>
				<Route index element={<HomeIndex />} />
				<Route path="sign" element={<Sign />}>
					<Route path=":actions" element={<SignOption />} />
				</Route>
				<Route
					path="measurement"
					element={
						<RequireAuth>
							<Measurement />
						</RequireAuth>
					}
				>
					<Route index element={<MeasurementIndex />} />
					<Route path=":personId" element={<RealTime />} />
				</Route>

				<Route
					path="patientHistory"
					element={
						<RequireAuth>
							<PatientHistory />
						</RequireAuth>
					}
				>
					<Route index element={<HistorySelect />} />
					<Route path=":id" element={<HistoryChart />} />
				</Route>
				<Route
					path="patientRegistration"
					element={
						<RequireAuth>
							<PatientRegistration />
						</RequireAuth>
					}
				/>
				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
							<h2>Error 404</h2>
						</main>
					}
				/>
			</Route>
		</Routes>
	)
}
