import React from "react"
import { Routes, Route } from "react-router-dom"
import Charts from "../pages/charts"
import PatientHistory from "../pages/patientHistory"
import PatientRegistration from "../pages/patientRegistration"

function LoggedInRoutes() {
    return (
        <Routes>
            <Route path="/charts" element={<Charts />} />
            <Route path="/patientHistory" element={<PatientHistory />} />
            <Route path="/patientRegistration" element={<PatientRegistration />} />
        </Routes>
    )
}

export default LoggedInRoutes
