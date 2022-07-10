import React, { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../service/api"
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

    useMemo(() => {
        getPerson(personId as string)
            .then(data => setPerson(data))
            .catch(e => console.error(e))
    }, [])

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString()
    }

    return (
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
    )
}
