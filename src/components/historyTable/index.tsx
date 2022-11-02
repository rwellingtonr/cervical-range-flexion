import React from "react"
import Box from "@mui/system/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import type { MeasureHistory } from "../../interface/measurement"

type HistoryTableProps = {
	rows: MeasureHistory[]
}

const columns: GridColDef[] = [
	{ field: "id", headerName: "Index", align: "center", headerAlign: "center", width: 150 },
	{
		field: "measurement_date",
		headerName: "Data da Avaliação",
		width: 350,
		headerAlign: "center",
		align: "center",
		description: "Data em que foi realizada a averiguação",
	},
	{
		field: "score",
		headerName: "Pontuação Obtida",
		width: 350,
		align: "center",
		headerAlign: "center",

		description: "Mostra o maior valor obtido naquela avaliação",
	},
]

export default function HistoryTable({ rows }: HistoryTableProps) {
	return (
		<Box component={"div"} sx={{ height: 250, width: 800, paddingTop: 5 }}>
			<DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
		</Box>
	)
}
