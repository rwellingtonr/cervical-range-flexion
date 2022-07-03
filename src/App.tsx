import { useEffect, useState } from "react"

import LoggedInRoutes from "./routes/loggedInRoutes"
import LoggedOutRoutes from "./routes/loggedOutRoutes"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem("@tcc:token")
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    return <LoggedOutRoutes />
}

export default App
