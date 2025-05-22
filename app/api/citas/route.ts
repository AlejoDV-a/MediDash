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
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const nuevaCita = await prisma.appointments.create({
      data: {
        patient_id: parseInt(data.patientId),
        medico_id: parseInt(data.medicoId),
        appointment_type_id: parseInt(data.appointmentTypeId),
        date: new Date(data.date),
        time: new Date(`${data.date}T${data.time}`),
        notes: data.notes || '',
        status: 'scheduled', 
      },
    });

  return NextResponse.json(nuevaCita);
}catch (error: unknown) {
    console.error('❌ Error al crear la cita:', error);
    return NextResponse.json(
      { message: 'Error al crear la cita' },
      { status: 500 }
    );
  }
}

