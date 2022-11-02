import type { Patient } from "./patient"

export type MeasureHistory = {
	id: string
	measurement_date: Date
	score: number
	patient_id: string
	physio_crefito: string
	patient: Patient
}
