import React from "react"
import style from "./layout.module.scss"

function Footer() {
    return (
        <footer className={style.footerWrapper}>
            <div className={style.footerContent}>
                <p>&copy; Marca registrada do grupo de TCC Electronic Cervical Spine Flex</p>
            </div>
        </footer>
    )
}

export default Footer
