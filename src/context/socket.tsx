import React, { createContext, ReactNode, useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

type Provider = {
    children: ReactNode
}

type SocketContext = {
    socket: Socket
}

export const SocketContext = createContext({} as SocketContext)

export default function SocketProvider({ children }: Provider) {
    const socket = io(import.meta.env.VITE_BACK_END)

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

export const useSocket = () => React.useContext(SocketContext)
