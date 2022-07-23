import React, { useEffect, useRef, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from "recharts"
import { api } from "../../service/api"

type MeasureHistory = {
    id: string
    measurement_date: Date
    score: number
    patient_id: string
    physio_coffito: string
}

export default function AreaHistoryChart() {
    const { id } = useParams<"id">()
    const [searchParams] = useSearchParams()
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const [data, setData] = useState<MeasureHistory[]>([])
    const isFirstRender = useRef<boolean>(true)

    useEffect(() => {
        // if (isFirstRender.current) {
        //     isFirstRender.current = false
        //     return
        // }
        retrieveData()
            .then(content => {
                console.log("oi")
                setData(content)
            })
            .catch(e => console.error(e))
    }, [id, startDate, endDate])

    const retrieveData = async () => {
        const res = await api.get<MeasureHistory[]>(`/history/${id}`, {
            params: {
                firstDate: !startDate ? new Date(startDate as string).toISOString() : "",
                lastDate: !endDate ? new Date(endDate as string).toISOString() : "",
            },
        })

        return res.data
    }

    return data.length ? (
        <AreaChart
            width={800}
            height={350}
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
            <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="measurement_date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />

            <Area
                type="monotone"
                dataKey="score"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
            />
        </AreaChart>
    ) : (
        <></>
    )
}
