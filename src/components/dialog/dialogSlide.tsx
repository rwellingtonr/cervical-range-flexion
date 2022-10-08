import React from "react"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"

type DialogSlideProps = {
	children: React.ReactNode
	title: string
	handleClose: () => void
	open: boolean
}
interface ITransitionPros extends TransitionProps {
	children: React.ReactElement
}
function TransitionRef(props: ITransitionPros, ref: React.Ref<unknown>) {
	const newProps = { ...props, timeout: 650 }
	return <Slide direction="up" ref={ref} {...newProps} />
}
const Transition = React.forwardRef(TransitionRef)

export default function DialogSlide({ children, title, handleClose, open }: DialogSlideProps) {
	return (
		<Box component={"div"}>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{title}</DialogTitle>
				{children}
			</Dialog>
		</Box>
	)
}
