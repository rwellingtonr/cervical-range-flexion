import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../../layout/footer"
import style from "./home.module.scss"
import HeaderBarHome from "../../components/headerBar/headerBarHome"
import HeaderBarLogged from "../../components/headerBar/headerBarLogged"
import { useAuth } from "../../context/auth"

export default function Home() {
	const { token } = useAuth()

	return (
		<div className={style.containerWrapper}>
			<div className={style.header}>{token ? <HeaderBarLogged /> : <HeaderBarHome />}</div>
			<main className={style.outlet}>
				<Outlet />
			</main>
			<div className={style.footer}>
				<Footer />
			</div>
		</div>
	)
}
