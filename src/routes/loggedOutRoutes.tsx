import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"

function LoggedOutRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route
                    index
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>Primeira tela</p>
                        </main>
                    }
                />
                <Route path="sign" element={<div>frame lateral esquerdo</div>}>
                    <Route path="type" element={<div>Sign in ou Sign up</div>} />
                </Route>
            </Route>
        </Routes>
    )
}

export default LoggedOutRoutes
