import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignInButton from "../components/signIn/signInButton"
import HomeIndex from "../pages/home/homeIndex"
import HomeLoggedOut from "../pages/home/homeLoggedOut"

function LoggedOutRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLoggedOut />}>
                    <Route index element={<HomeIndex />} />
                    <Route path="sign" element={<div>frame lateral esquerdo</div>}>
                        <Route path=":action" element={<div>Sign in ou Sign up</div>} />
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
