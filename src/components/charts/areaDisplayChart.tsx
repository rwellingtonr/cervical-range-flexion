import React from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts"

type AreaChart = {
	xAxis: string
	areaValue: string
	dataValues: any[]
}

export default function AreaDisplayChart({ dataValues, xAxis, areaValue }: AreaChart) {
	return (
		<AreaChart
			width={800}
			height={350}
			data={dataValues}
			margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
		>
			<defs>
				<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
					<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
				</linearGradient>
			</defs>
			<XAxis dataKey={xAxis} />
			<YAxis />
			<CartesianGrid strokeDasharray="3 3" />
			<Tooltip />

			<Area
				type="monotone"
				dataKey={areaValue}
				stroke="#82ca9d"
				fillOpacity={1}
				fill="url(#colorPv)"
			/>
		</AreaChart>
	)
}
