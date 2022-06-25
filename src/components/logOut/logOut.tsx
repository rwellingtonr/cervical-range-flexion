import React, { useContext } from "react"
import { AuthContext } from "../../context/auth"

function LogOut() {
    const { signOut } = useContext(AuthContext)

    return <div>LogOut</div>
}

export default LogOut
