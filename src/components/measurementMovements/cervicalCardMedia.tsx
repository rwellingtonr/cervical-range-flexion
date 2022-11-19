import React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import { cervicalMovements } from "./cervicalMovements"
import type { Movement } from "../../interface/movement"

type CervicalCardMediaProps = {
	movement: Movement
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
