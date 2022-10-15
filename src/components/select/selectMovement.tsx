import React from "react"
import type { Movement, MovementOptions } from "../../interface/movement"
import { movementOptions } from "../../utils/movements"
import StackSelect from "../stackSelect/stackSelect"

type SelectMovementProps = {
	setMovement: (movement: Movement) => void
}

export default function SelectMovement({ setMovement }: SelectMovementProps) {
	const defaultProps = {
		options: movementOptions,
		getOptionLabel: (option: MovementOptions) => option.label,
	}

	const handleSelect = (label: string) => {
		const option = movementOptions.find(item => item.label === label)
		setMovement(option?.movement as Movement)
	}

	const stackProps = {
		...defaultProps,
		label: "Movimentos",
		placeholder: "Selecione um movimento",
		handleSelect,
	}

	return <StackSelect {...stackProps} />
}
