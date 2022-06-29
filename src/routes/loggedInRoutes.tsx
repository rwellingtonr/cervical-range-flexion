import React from "react"
import { Routes, Route } from "react-router-dom"
import Base from "../layout/base"
import Charts from "../pages/charts"
import PatientHistory from "../pages/patientHistory"
import PatientRegistration from "../pages/patientRegistration"

function LoggedInRoutes() {
    return (
        <Routes>
            <Route path="/cervical" element={<Base />}>
                <Route path="/charts" element={<Charts />} />
                <Route path="/patientHistory" element={<PatientHistory />} />
                <Route path="/patientRegistration" element={<PatientRegistration />} />
            </Route>
        </Routes>
    )
}

export default LoggedInRoutes
