import React, { useState } from "react"
import Button from "@mui/material/Button"
import style from "./headerBar.module.scss"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"

function headerBar() {
    const [action, setAction] = useState<string>("register")
    const [state, setState] = useState<boolean>(true)

    const handleSetAction = () => {
        if (state) {
            setState(false)
            setAction("login")
            return
        }
        setState(true)
        setAction("register")
    }

    return (
        <div className={style.headerWrapper}>
            <div className={style.headerLogo}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <img src={logo} alt="Logo" />{" "}
                </Link>
            </div>
            <div className={style.headerButton}>
                <Link to={`/sign/${action}`} style={{ textDecoration: "none" }}>
                    <Button
                        className={style.Button}
                        variant="contained"
                        size="large"
                        onClick={() => handleSetAction()}
                    >
                        {state ? "Registrar" : "Ascender"}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default headerBar
