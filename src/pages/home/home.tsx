import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../../layout/footer"
import style from "./home.module.scss"
import HeaderBarHome from "../../components/headerBar/headerBarHome"

export default function Home() {
    return (
        <div className={style.containerWrapper}>
            <div className={style.header}>
                <HeaderBarHome />
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
