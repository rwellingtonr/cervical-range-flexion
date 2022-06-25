import { useEffect, useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
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

    return <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
}

export default App
