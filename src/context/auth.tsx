import React, { createContext, ReactNode, useEffect, useState } from "react"
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

function AuthProvider({ children }: AuthProvider) {
	const [token, setToken] = useState<string>(() => {
		try {
			const code = localStorage.getItem("@tcc:token")
			return code ?? ""
		} catch (error) {
			return ""
		}
	})

	useEffect(() => {
		const code = localStorage.getItem("@tcc:token")
		if (code) setBearer(code)
	}, [])

	const setBearer = (token: string) => {
		api.defaults.headers.common.authorization = `Bearer ${token}`
	}
	const setPhysiotherapist = ({ id, name, coffito }: Physiotherapist) => {
		localStorage.setItem("@tcc:id", id)
		localStorage.setItem("@tcc:name", name)
		localStorage.setItem("@tcc:coffito", coffito)
	}
	const removePhysiotherapist = () => {
		localStorage.removeItem("@tcc:id")
		localStorage.removeItem("@tcc:name")
		localStorage.removeItem("@tcc:coffito")
	}

	const signIn = async (signIn: SignIn) => {
		const res = await api.post<LogIn>("signin", signIn)
		const { token, physiotherapist } = res.data
		localStorage.setItem("@tcc:token", token)
		setToken(token)
		setBearer(token)
		setPhysiotherapist(physiotherapist)
	}

	const signOut = () => {
		setToken("")
		localStorage.removeItem("@tcc:token")
		removePhysiotherapist()
	}

	return (
		<AuthContext.Provider value={{ token, signIn, signOut }}>{children}</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return React.useContext(AuthContext)
}

export default AuthProvider
