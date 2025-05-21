// app/citas/page.tsx
'use client'

import { useEffect, useState } from 'react';

type Cita = {
  id: number;
  date: string;
  time: string;
  notes: string;
  patients: { nombre: string };
  medicos: { nombre: string };
  appointment_types: { nombre: string };
};

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    fetch('/api/citas')
      .then((res) => res.json())
      .then(setCitas);
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-card rounded shadow">
      <h1 className="text-2xl font-semibold mb-4 text-card-foreground">Citas Agendadas</h1>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="text-left p-2">Paciente</th>
            <th className="text-left p-2">Médico</th>
            <th className="text-left p-2">Tipo</th>
            <th className="text-left p-2">Fecha</th>
            <th className="text-left p-2">Hora</th>
            <th className="text-left p-2">Notas</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id} className="border-b border-muted">
              <td className="p-2">{cita.patients?.nombre}</td>
              <td className="p-2">{cita.medicos?.nombre}</td>
              <td className="p-2">{cita.appointment_types?.nombre}</td>
              <td className="p-2">{new Date(cita.date).toLocaleDateString()}</td>
              <td className="p-2">{new Date(cita.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td className="p-2">{cita.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
