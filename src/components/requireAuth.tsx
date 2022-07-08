import React from "react"
import { Navigate, useLocation } from "react-router-dom"

type Children = { children: JSX.Element }

export default function RequireAuth({ children }: Children) {
    const token = localStorage.getItem("@tcc:token")
    const location = useLocation()

    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children
}
