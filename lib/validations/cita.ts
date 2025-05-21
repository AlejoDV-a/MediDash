import { z } from "zod";

export const citaSchema = z.object({
  paciente: z.string().min(1, "El paciente es obligatorio"),
  medico: z.string().min(1, "El médico es obligatorio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  motivo: z.string().min(3, "El motivo debe tener al menos 3 caracteres"),
  estado: z.enum(['pendiente', 'confirmada', 'cancelada']),
  notas: z.string().optional(),
});

export type CitaSchema = z.infer<typeof citaSchema>;
