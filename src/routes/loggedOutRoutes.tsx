import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeIndex from "../pages/home/homeIndex"
import HomeLoggedOut from "../pages/home/homeLoggedOut"
import Sign from "../pages/sign/sign"
import SignOption from "../pages/sign/signOption"

function LoggedOutRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLoggedOut />}>
                    <Route index element={<HomeIndex />} />
                    <Route path="sign" element={<Sign />}>
                        <Route path=":actions" element={<SignOption />} />
                    </Route>
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
        </BrowserRouter>
    )
}

export default LoggedOutRoutes
