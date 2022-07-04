import React from "react"
import { useParams } from "react-router-dom"
import SignIn from "../../components/signIn/signIn"
import SignUp from "../../components/signIn/signUp"

type FormsOptions = {
    login: JSX.Element
    register: JSX.Element
    password: JSX.Element
}
type actionOptions = "login" | "register" | "password"

const formsOptions: FormsOptions = {
    login: <SignIn />,
    register: <SignUp />,
    password: <div />,
}
export default function SignOption() {
    const { actions } = useParams()

    const selectForm = (action: actionOptions): JSX.Element => {
        const form = formsOptions[action]
        if (!form) return <></>

        return form
    }

    return <div>{selectForm(actions as actionOptions)}</div>
}
