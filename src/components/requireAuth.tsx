import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/auth"

type Children = { children: JSX.Element }

export default function RequireAuth({ children }: Children) {
	const { token } = useAuth()
	const location = useLocation()

	if (!token) {
		return <Navigate to="/" state={{ from: location }} replace />
	}

	return children
}
