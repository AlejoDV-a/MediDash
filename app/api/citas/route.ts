// app/api/citas/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const citas = await prisma.appointments.findMany({
    include: {
      appointment_types: true,
      medicos: true,
      patients: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  return NextResponse.json(citas);
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validación opcional
    if (!data.appointmentTypeId || isNaN(Number(data.appointmentTypeId))) {
      return NextResponse.json({ error: "Invalid appointment type ID" }, { status: 400 })
    }

    const newAppointment = await prisma.appointments.create({
      data: {
        patient_id: parseInt(data.patientId),
        medico_id: parseInt(data.medicoId),
        appointment_type_id: parseInt(data.appointmentTypeId),
        date: new Date(data.date),
        time: new Date(data.time),
        status: data.status || "scheduled",
        notes: data.notes || null,
      },
    })

    return NextResponse.json(newAppointment)
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

