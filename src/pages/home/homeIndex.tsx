import React, { useEffect } from "react"
import spine from "../../assets/espinha.svg"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import style from "./home.module.scss"
import Fade from "@mui/material/Fade"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth"

export default function HomeIndex() {
	const { token } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (token) navigate("measurement")
	}, [token])

	return (
		<Grid container direction="column" justifyContent="center" alignItems="center">
			<Grid item xs={12}>
				<Fade in={true} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 2000 }}>
					<img src={spine} alt="Espinha Cervical" />
				</Fade>
			</Grid>
			<Grid item xs={12}>
				<Link to="/sign/login" style={{ textDecoration: "none" }}>
					<Button variant="contained" size="large" className={style.button}>
						Ascender
					</Button>
				</Link>
			</Grid>
		</Grid>
	)
}
