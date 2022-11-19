import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { api } from "../../service/api"
import AreaDisplayChart from "../charts/areaDisplayChart"
import { MeasureHistory } from "../../interface/measurement"
import HistoryInfo from "../historyInfo"
import HistoryTable from "../historyTable"
import HistoryNotFound from "../historyNotFound"

export default function HistoryChart() {
	const { id } = useParams<"id">()
	const [searchParams] = useSearchParams()
	const startDate = searchParams.get("startDate") as string
	const endDate = searchParams.get("endDate") as string
	const movement = searchParams.get("movement")
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [data, setData] = useState<MeasureHistory[]>([])
	const [showTable, setShowTable] = useState<boolean>(false)

	useEffect(() => {
		retrieveData()
			.then(content => setData(content))
			.catch(e => console.error(e))
			.finally(() => setIsLoading(false))
	}, [id, startDate, endDate])

	const setIsoStringDate = (dateString: string) => new Date(dateString).toISOString()

	function containsNumbers(str: string) {
		return /\d/.test(str)
	}

	const retrieveData = async () => {
		console.log({ startDate, endDate })
		console.log(startDate?.length)
		const res = await api.get<MeasureHistory[]>(`/history/${id}`, {
			params: {
				firstDate: containsNumbers(startDate) ? setIsoStringDate(startDate) : "",
				lastDate: containsNumbers(endDate) ? setIsoStringDate(endDate) : "",
				movement,
			},
		})
		return res.data
	}

	const handleClick = () => {
		setShowTable(!showTable)
	}

	const returnChart = () => {
		const rowsFormatted = data.map(row => ({
			...row,
			measurement_date: new Date(row.measurement_date).toLocaleDateString(
				"pt-BR"
			) as unknown as Date,
		}))
		return (
			<>
				{showTable ? (
					<HistoryTable rows={rowsFormatted} />
				) : (
					<AreaDisplayChart
						dataValues={rowsFormatted}
						xAxis={"measurement_date"}
						areaValue={"score"}
					/>
				)}
				<HistoryInfo
					data={data}
					movement={movement}
					state={showTable}
					switchState={handleClick}
				/>
			</>
		)
	}

	return isLoading ? <></> : data.length ? returnChart() : <HistoryNotFound />
}
