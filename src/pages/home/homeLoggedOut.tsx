import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../../layout/footer"
import style from "./home.module.scss"
import HeaderBar from "../../components/signIn/headerBar"

export default function HomeLoggedOut() {
    return (
        <div className={style.containerWrapper}>
            <div className={style.header}>
                <HeaderBar />
            </div>
            <main className={style.outlet}>
                <Outlet />
            </main>
            <div className={style.footer}>
                <Footer />
            </div>
        </div>
    )
}
