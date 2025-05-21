'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion } from 'framer-motion';



const citaSchema = z.object({
  patientId: z.string().min(1, 'El ID del paciente es obligatorio'),
  medicoId: z.string().min(1, 'El ID del médico es obligatorio'),
  appointmentTypeId: z.string().min(1, 'El tipo de cita es obligatorio'),
  date: z.string().min(1, 'La fecha es obligatoria'),
  time: z.string().min(1, 'La hora es obligatoria'),
  notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof citaSchema>;

export default function NuevaCita() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(citaSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const res = await fetch('/api/citas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert('Cita creada correctamente');
    } else {
      alert('Error al crear la cita');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-card rounded-lg shadow-sm">
      <h2 className="  text-card-foreground text-2xl font-semibold mb-6 text-center">Agendar Nueva Cita</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
          <label className="text-card-foreground  bg-clip-text inline-block" htmlFor="patientId">
            ID del Paciente
          </label>
          <Input id="patientId" {...register('patientId')} />
          {errors.patientId && (
            <p className="text-sm text-red-600 mt-1">{errors.patientId.message}</p>
          )}
        </div>

        <div>
          <label className="text-card-foreground bg-clip-text inline-block" htmlFor="medicoId">
            ID del Médico
          </label>
          <Input id="medicoId" {...register('medicoId')} />
          {errors.medicoId && (
            <p className="text-sm text-red-600 mt-1">{errors.medicoId.message}</p>
          )}
        </div>

        <div>
        <label className=" bg-card text-card-foreground block mb-1" htmlFor="appointmentTypeId">
          Tipo de Cita
        </label>
          <select
            id="appointmentTypeId"
            {...register('appointmentTypeId')}
            className=" bg-card w-full border px-3 py-2 rounded-md"
          >
             <option value="">Selecciona un tipo</option>
             <option value="1">Consulta General</option>
             <option value="2">Control</option>
             <option value="3">Higiene Dental</option>
             <option value="4">Fisioterapia</option>
            {/* Cambia estos valores por los IDs reales que tienes en tu base de datos */}
            </select>
            {errors.appointmentTypeId && (
            <p className=" bg-card text-sm text-red-600 mt-1">{errors.appointmentTypeId.message}</p>
            )}
            </div>


        <div className="  rounded-b-lg grid grid-cols-2 gap-4">
          <div>
            <label className=" text-card-foreground block mb-1 font-medium" htmlFor="date">
              Fecha
            </label>
            <Input id="date" type="date" {...register('date')} />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className=" text-card-foreground block mb-1 font-medium" htmlFor="time">
              Hora
            </label>
            <Input id="time" type="time" {...register('time')} />
            {errors.time && (
              <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className=" text-card-foreground block mb-1 font-medium" htmlFor="notes">
            Notas
          </label>
          <Textarea id="notes" placeholder="Detalles adicionales" {...register('notes')} />
          {errors.notes && (
            <p className="text-sm text-red-600 mt-1">{errors.notes.message}</p>
          )}
        </div>

<motion.div
       whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
     <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Agendando...' : 'Agendar Cita'}
        </Button>

            </motion.div>
       
        
      </form>
    </div>
  );
}
