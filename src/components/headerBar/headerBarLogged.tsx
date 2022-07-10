import React from "react"
import style from "./headerBar.module.scss"
import spine from "../../assets/espinha.svg"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"
import DefaultButton from "../defaultButton.ts/defaultButton"
import FloatingActionButtonZoom from "../tabHeader/tabHeader"
import { useAuth } from "../../context/auth"

export default function HeaderBarLogged() {
    const { signOut } = useAuth()

    return (
        <header className={style.headerWrapper}>
            <div className={style.headerLogo}>
                <Link to="/measurement" style={{ textDecoration: "none" }}>
                    <img src={logo} alt="Logo" />{" "}
                </Link>
                <img src={spine} alt="Espinha Cervical" />
            </div>
            <div className={style.headerMiddle}>
                <FloatingActionButtonZoom />
            </div>
            <div className={style.headerButton}>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <DefaultButton handleClick={signOut}>Sair</DefaultButton>
                </Link>
            </div>
        </header>
    )
}
