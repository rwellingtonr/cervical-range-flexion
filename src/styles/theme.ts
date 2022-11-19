import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"

export const theme = createTheme({
	palette: {
		primary: {
			main: "#8fdac8",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
	},
})
