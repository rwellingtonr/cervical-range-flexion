import React, { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../../service/api"
import DefaultButton from "../defaultButton.ts/defaultButton"
import style from "./personInfo.module.scss"

type PersonData = {
    id: string
    name: string
    cpf: string
    gender: string
    birthday: string
    surgery_date: string
}
const getPerson = async (personId: string) => {
    const res = await api.get<PersonData>(`/patient/${personId}`)
    return res.data
}

export default function PersonInfo() {
    const [person, setPerson] = useState<PersonData>()
    const { personId } = useParams()
    const navigate = useNavigate()

    useMemo(() => {
        getPerson(personId as string)
            .then(data => setPerson(data))
            .catch(e => {
                console.error(e)
                navigate("/measurement")
            })
    }, [personId])

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString()
    }

    return !!person ? (
        <>
            <main className={style.personWrapper}>
                <h2 className={style.name}>{person?.name}</h2>
                <div className={style.tableInLine}>
                    <p>Nascimento: </p>
                    <p>{formatDate(person?.birthday as string)}</p>
                </div>
                <div className={style.tableInLine}>
                    <p>Cirurgia: </p>
                    <p>{formatDate(person?.surgery_date as string)}</p>
                </div>
            </main>
            <div className={style.bottom}>
                <Link to={"/charts"} style={{ textDecoration: "none" }}>
                    <DefaultButton handleClick={console.log}> Prosseguir </DefaultButton>
                </Link>
            </div>
        </>
    ) : (
        <></>
    )
}
