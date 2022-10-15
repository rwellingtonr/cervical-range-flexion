import React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Collapse from "@mui/material/Collapse"

// images
import lateralLeft from "../../assets/Lateral esquerda.png"
import lateralRight from "../../assets/Lateral direita.png"
import flexion from "../../assets/flexão.png"
import { Movement } from "../../interface/movement"

type CervicalCardMediaProps = {
	movement: Movement
}

const cervicalMovements = {
	"lateral-right": {
		src: lateralRight,
		text: "O paciente deve realizado o movimento de flexão à lateral direita",
	},
	"lateral-left": {
		src: lateralLeft,
		text: "O paciente deve realizado o movimento de flexão à lateral esquerda",
	},
	flexion: { src: flexion, text: "O paciente deve realizado o movimento de flexão frontal" },
}

export default function CervicalCardMedia({ movement }: CervicalCardMediaProps) {
	const cervicalMovement = cervicalMovements[movement]

	return (
		<Card sx={{ maxWidth: 345, margin: "10px" }}>
			<Collapse
				in={!!cervicalMovement}
				style={{ transformOrigin: "0 0 0" }}
				{...(cervicalMovement ? { timeout: 1000 } : {})}
			>
				<CardMedia
					sx={{ height: "100%" }}
					component="img"
					height="194"
					image={cervicalMovement.src}
					alt="Movimento da coluna cervical"
				/>
			</Collapse>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{cervicalMovement.text}
				</Typography>
			</CardContent>
		</Card>
	)
}
