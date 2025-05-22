// lib/types.ts


export type Patient = {
  id: number
  name: string
  gender: string
  age: number
  email: string
  phone: string
  last_visit: string
  condition: string
  status: "needs attention" | "improving" | "stable"
  initials: string
  avatar: string
}


export interface Appointment {
  id: number
  patient_name: string
  time: string
  duration: number
  type: string
  status: string
  patient_id: number
  doctor_name?: string
  initials?: string  // <- Agregado
  avatar?: string 
}

export interface MonthlyStats {
  name: string
  appointments: number
  new_patients: number
}
