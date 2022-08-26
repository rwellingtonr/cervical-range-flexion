import React, { createContext, ReactNode, useContext, useState } from "react"
import { api } from "../service/api"

type AuthProvider = {
	children: ReactNode
}

type AuthContextValue = {
	token: string
	signIn: (signIn: SignIn) => Promise<void>
	signOut: () => void
}
type Physiotherapist = {
	id: string
	name: string
	coffito: string
}

type LogIn = {
	token: string
	physiotherapist: Physiotherapist
}

type SignIn = {
	coffito: string
	password: string
}

export const AuthContext = createContext({} as AuthContextValue)

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: AuthProvider) {
	const [token, setToken] = useState<string>(() => {
		try {
			const code = localStorage.getItem("@tcc:token")

			if (code) api.defaults.headers.common.authorization = `Bearer ${code}`
			return code ?? ""
		} catch (error) {
			return ""
		}
	})

	const signIn = async (signIn: SignIn) => {
		const res = await api.post<LogIn>("signin", signIn)
		const { token, physiotherapist } = res.data
		localStorage.setItem("@tcc:token", token)
		localStorage.setItem("@tcc:coffito", physiotherapist.coffito)
		api.defaults.headers.common.authorization = `Bearer ${token}`
		setToken(token)
	}

	const signOut = () => {
		setToken("")
		localStorage.removeItem("@tcc:token")
		localStorage.removeItem("@tcc:coffito")
	}

	return (
		<AuthContext.Provider value={{ token, signIn, signOut }}>{children}</AuthContext.Provider>
	)
}
