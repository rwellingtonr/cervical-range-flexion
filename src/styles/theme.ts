import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"

export const theme = createTheme({
	palette: {
		primary: {
			main: "#19857b",
		},
		secondary: {
			main: "#8fdac8",
		},
		error: {
			main: red.A400,
		},
	},
})
