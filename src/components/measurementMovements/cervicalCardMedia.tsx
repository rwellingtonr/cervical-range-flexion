import React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"

// images
import lateralLeft from "../../assets/lateral esquerda.png"
import lateralRight from "../../assets/lateral direita.png"
import flexion from "../../assets/flexão.png"
import { Movement } from "../../interface/movement"

type CervicalCardMediaProps = {
	movement: Movement
}

const cervicalMovements = {
	"lateral-right": {
		src: lateralRight,
		text: "O paciente deve realizado o movimento de flexão à Rotação lateral direita",
	},
	"lateral-left": {
		src: lateralLeft,
		text: "O paciente deve realizado o movimento de flexão à Rotação lateral esquerda",
	},
	flexion: { src: flexion, text: "O paciente deve realizado o movimento de Flexão frontal" },
}

export default function CervicalCardMedia({ movement }: CervicalCardMediaProps) {
	const cervicalMovement = cervicalMovements[movement]

	return (
		<Card sx={{ maxWidth: 345, margin: "10px" }}>
			<CardMedia
				sx={{ height: "100%" }}
				component="img"
				height="194"
				image={cervicalMovement.src}
				alt="Movimento da coluna cervical"
			/>

			<CardContent>{cervicalMovement.text}</CardContent>
		</Card>
	)
}
