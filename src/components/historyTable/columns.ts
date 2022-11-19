import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
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
