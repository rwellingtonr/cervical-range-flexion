import * as React from "react"
import Snackbar from "@mui/material/Snackbar"
import Stack from "@mui/material/Stack"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { useAlert } from "../../context/alert"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
	const { handleAlert, error, handleClose } = useAlert()

	React.useEffect(() => {
		handleAlert("")
	}, [])

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar open={!!error.message} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={error.severity} sx={{ width: "100%" }}>
					{error.message}
				</Alert>
			</Snackbar>
		</Stack>
	)
}
