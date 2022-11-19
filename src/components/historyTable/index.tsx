import React from "react"
import Box from "@mui/system/Box"
import { DataGrid } from "@mui/x-data-grid"
import { columns } from "./columns"
import type { MeasureHistory } from "../../interface/measurement"

type HistoryTableProps = {
	rows: MeasureHistory[]
}

export default function HistoryTable({ rows }: HistoryTableProps) {
	return (
		<Box component={"div"} sx={{ height: 250, width: 800, paddingTop: 5 }}>
			<DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
		</Box>
	)
}
