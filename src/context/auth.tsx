import React, { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../service/api"

type AuthProvider = {
    children: ReactNode
}

type AuthContextValue = {
    physiotherapist: Physiotherapist | null
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
    const [physiotherapist, setPhysiotherapist] = useState<Physiotherapist | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("@tcc:token")
        if (token) {
            setToken(token)
            setPhysiotherapist(prev => prev)
        }
    }, [])

    const signIn = async (signIn: SignIn) => {
        const res = await api.post<LogIn>("signin", signIn)
        const { token, physiotherapist } = res.data
        setToken(token)
        setPhysiotherapist(physiotherapist)
    }

    const setToken = (token: string) => {
        localStorage.setItem("@tcc:token", token)
        api.defaults.headers.common.authorization = `Bearer ${token}`
    }

    const signOut = () => {
        localStorage.removeItem("@tcc:token")
        setPhysiotherapist(null)
    }

    return (
        <AuthContext.Provider value={{ physiotherapist, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return React.useContext(AuthContext)
}

export default AuthProvider
