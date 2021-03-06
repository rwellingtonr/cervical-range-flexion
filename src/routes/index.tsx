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
import PersonInfo from "../components/personInfo/personInfo"
import Charts from "../pages/charts/charts"
import HistorySelect from "../components/history/historySelect"
import AreaHistoryChart from "../components/charts/areaHistoryChart"

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
                    <Route path=":personId" element={<PersonInfo />} />
                </Route>
                <Route
                    path="charts"
                    element={
                        <RequireAuth>
                            <Charts />
                        </RequireAuth>
                    }
                />

                <Route
                    path="patientHistory"
                    element={
                        <RequireAuth>
                            <PatientHistory />
                        </RequireAuth>
                    }
                >
                    <Route index element={<HistorySelect />} />
                    <Route path=":id" element={<AreaHistoryChart />} />
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
