import React from "react"
import spine from "../../assets/espinha.svg"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import style from "./home.module.scss"

export default function HomeIndex() {
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <img src={spine} alt="Espinha Cervical" />
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
