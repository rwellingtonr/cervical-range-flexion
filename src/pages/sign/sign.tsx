import React from "react"
import { Outlet } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import spine from "../../assets/espinha.svg"
import style from "./signPage.module.scss"

export default function Sign() {
    return (
        <div className={style.signWrapper}>
            <div className={style.spine}>
                <span>
                    <img src={spine} alt="Cervical" />
                </span>
            </div>
            <div className={style.form}>
                <Outlet />
            </div>
        </div>
    )
}
