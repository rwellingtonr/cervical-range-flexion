import React, { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../context/auth"

function Sign() {
    const { signIn } = useContext(AuthContext)
    const [coffito, setCoffito] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    // const [first, setfirst] = useState(second)

    const handleSignIn = async (event: FormEvent) => {
        try {
            event.preventDefault()

            await signIn({ coffito, password })
        } catch (error) {
            console.log("Error ao tentar fazer o logIn")
        }
    }

    return <div>Sign</div>
}

export default Sign
