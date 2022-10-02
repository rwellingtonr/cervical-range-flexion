import React, { useState } from "react"
import style from "./headerBar.module.scss"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"
import DefaultButton from "../defaultButton.ts/defaultButton"

export default function headerBarHome() {
	const [state, setState] = useState<boolean>(true)

	const switchState = () => setState(!state)

	return (
		<header className={style.headerWrapper}>
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
					<DefaultButton handleClick={switchState}>
						{state ? "Registrar" : "Começar"}
					</DefaultButton>
				</Link>
			</div>
		</header>
	)
}
