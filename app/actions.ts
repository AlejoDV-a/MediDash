"use server"

import { sql } from "@/lib/db"
import { Patient, Appointment, MonthlyStats } from "@/lib/types"
// Fetch dashboard stats





export async function getDashboardStats() {
  const patientCountQuery = "SELECT COUNT(*) as count FROM patients"
  const todayAppointmentsQuery = `SELECT COUNT(*) as count FROM appointments WHERE appointment_date = CURRENT_DATE`

  const [patientCount, appointmentCount] = await Promise.all([
    sql.query(patientCountQuery),
    sql.query(todayAppointmentsQuery),
  ])

  return {
    totalPatients: patientCount[0].count,
    todayAppointments: appointmentCount[0].count,
    avgWaitTime: "14 min", // This would come from a more complex query in a real app
    satisfaction: "94%", // This would come from a more complex query in a real app
  }
}

// Fetch recent patients
export async function getRecentPatients() {
  const query = `
    SELECT 
      p.id, 
      p.first_name || ' ' || p.last_name as name, 
      p.gender,
      p.date_of_birth,
      EXTRACT(YEAR FROM AGE(CURRENT_DATE, p.date_of_birth)) as age,
      p.email,
      p.phone,
      TO_CHAR(MAX(a.appointment_date), 'Mon DD, YYYY') as last_visit,
      p.medical_history as condition,
      CASE 
        WHEN p.id IN (SELECT patient_id FROM vital_signs WHERE blood_pressure_systolic > 140 OR blood_pressure_diastolic > 90) THEN 'needs attention'
        WHEN p.id IN (SELECT patient_id FROM medical_records WHERE record_date > CURRENT_DATE - INTERVAL '30 days') THEN 'improving'
        ELSE 'stable'
      END as status
    FROM 
      patients p
    LEFT JOIN 
      appointments a ON p.id = a.patient_id
    GROUP BY 
      p.id, p.first_name, p.last_name, p.gender, p.date_of_birth, p.email, p.phone, p.medical_history
    ORDER BY 
      MAX(a.appointment_date) DESC NULLS LAST
    LIMIT 5
  `

  const patients = await sql.query(query) as Patient[]

  return patients.map((patient) => ({
    ...patient,
    initials: `${patient.name.charAt(0)}${patient.name.split(" ")[1]?.charAt(0) || ""}`,
    avatar: `/placeholder.svg?height=32&width=32`,
  }))
}

// Fetch all patients
export async function getAllPatients(): Promise<Patient[]> {
  const query = `...`
  const patients = await sql.query(query)


  return patients.map((patient): Patient => ({
    ...patient,
    initials: `${patient.name.charAt(0)}${patient.name.split(" ")[1]?.charAt(0) || ""}`,
    avatar: `/placeholder.svg?height=32&width=32`,
    id: 0,
    name: "",
    gender: "",
    age: 0,
    email: "",
    phone: "",
    last_visit: "",
    condition: "",
    status: "needs attention"
  }))
}


// Fetch today's appointments
export async function getTodayAppointments() {
  const query = `
    SELECT 
      a.id,
      p.first_name || ' ' || p.last_name as patient_name,
      TO_CHAR(a.appointment_time, 'HH:MI AM') as time,
      a.duration,
      a.type,
      a.status,
      p.id as patient_id
    FROM 
      appointments a
    JOIN 
      patients p ON a.patient_id = p.id
    WHERE 
      a.appointment_date = CURRENT_DATE
    ORDER BY 
      a.appointment_time
  `

  const appointments = await sql.query(query) as Appointment[]

  return appointments.map((appointment) => ({
    ...appointment,
    initials: `${appointment.patient_name.charAt(0)}${appointment.patient_name.split(" ")[1]?.charAt(0) || ""}`,
    avatar: `/placeholder.svg?height=32&width=32`,
  }))
}

// Fetch appointments for a specific date
export async function getAppointmentsByDate(date: string) {
  const query = `
    SELECT 
      a.id,
      p.first_name || ' ' || p.last_name as patient_name,
      TO_CHAR(a.appointment_time, 'HH:MI AM') as time,
      a.duration,
      a.type,
      a.status,
      p.id as patient_id,
      d.first_name || ' ' || d.last_name as doctor_name
    FROM 
      appointments a
    JOIN 
      patients p ON a.patient_id = p.id
    JOIN
      doctors d ON a.doctor_id = d.id
    WHERE 
      a.appointment_date = $1
    ORDER BY 
      a.appointment_time
  `

  const appointments = await sql.query(query, [date])

  return appointments.map((appointment) => ({
    ...appointment,
    initials: `${appointment.patient_name.charAt(0)}${appointment.patient_name.split(" ")[1]?.charAt(0) || ""}`,
    avatar: `/placeholder.svg?height=32&width=32`,
  }))
}

// Get monthly statistics for the overview chart
export async function getMonthlyStats() {


  const query = `
    WITH months AS (
      SELECT generate_series(
        date_trunc('month', CURRENT_DATE - INTERVAL '5 months'),
        date_trunc('month', CURRENT_DATE),
        interval '1 month'
      ) AS month
    ),
    appointment_counts AS (
      SELECT 
        date_trunc('month', appointment_date) AS month,
        COUNT(*) AS appointment_count
      FROM 
        appointments
      WHERE 
        appointment_date >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY 
        date_trunc('month', appointment_date)
    ),
    new_patient_counts AS (
      SELECT 
        date_trunc('month', created_at) AS month,
        COUNT(*) AS new_patient_count
      FROM 
        patients
      WHERE 
        created_at >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY 
        date_trunc('month', created_at)
    )
    SELECT 
      TO_CHAR(m.month, 'Mon') AS name,
      COALESCE(ac.appointment_count, 0) AS appointments,
      COALESCE(npc.new_patient_count, 0) AS new_patients
    FROM 
      months m
    LEFT JOIN 
      appointment_counts ac ON m.month = ac.month
    LEFT JOIN 
      new_patient_counts npc ON m.month = npc.month
    ORDER BY 
      m.month
  `
  

return sql.query(query) as unknown as MonthlyStats[]
}
