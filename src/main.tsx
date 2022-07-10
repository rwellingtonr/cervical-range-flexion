import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import "virtual:fonts.css"
import AuthProvider from "./context/auth"
import SocketProvider from "./context/socket"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <SocketProvider>
                <App />
            </SocketProvider>
        </AuthProvider>
    </React.StrictMode>
)
