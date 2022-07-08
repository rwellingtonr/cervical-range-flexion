import React, { useState } from "react"
import Button from "@mui/material/Button"
import style from "./headerBar.module.scss"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"

export default function headerBarHome() {
    const [state, setState] = useState<boolean>(true)

    return (
        <div className={style.headerWrapper}>
            <div className={style.headerLogo}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <img src={logo} alt="Logo" />{" "}
                </Link>
            </div>
            <div className={style.headerButton}>
                <Link
                    to={`/sign/${state ? "register" : "login"}`}
                    style={{ textDecoration: "none" }}
                >
                    <Button
                        className={style.Button}
                        variant="contained"
                        size="large"
                        onClick={() => setState(!state)}
                    >
                        {state ? "Registrar" : "Ascender"}
                    </Button>
                </Link>
            </div>
        </div>
    )
}
