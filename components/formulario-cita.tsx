"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { citaSchema, CitaSchema } from "@/lib/validations/cita";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function FormularioCita() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CitaSchema>({
    resolver: zodResolver(citaSchema),
  });

const onSubmit = async (data: CitaSchema) => {
  const res = await fetch("/api/citas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const result = await res.json();
    console.log("Cita guardada:", result);
    reset();
  } else {
    console.error("Error al guardar la cita");
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <Label>Paciente</Label>
        <Input {...register("paciente")} />
        {errors.paciente && <p className="text-sm text-red-500">{errors.paciente.message}</p>}
      </div>

      <div>
        <Label>Médico</Label>
        <Input {...register("medico")} />
        {errors.medico && <p className="text-sm text-red-500">{errors.medico.message}</p>}
      </div>

      <div>
        <Label>Fecha y Hora</Label>
        <Input type="datetime-local" {...register("fecha")} />
        {errors.fecha && <p className="text-sm text-red-500">{errors.fecha.message}</p>}
      </div>

      <div>
        <Label>Motivo</Label>
        <Input {...register("motivo")} />
        {errors.motivo && <p className="text-sm text-red-500">{errors.motivo.message}</p>}
      </div>

      <div>
        <Label>Estado</Label>
        <Select onValueChange={(value) => setValue("estado", value as CitaSchema["estado"])}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="confirmada">Confirmada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
        {errors.estado && <p className="text-sm text-red-500">{errors.estado.message}</p>}
      </div>

      <div>
        <Label>Notas (opcional)</Label>
        <textarea
          className="w-full border rounded px-3 py-2"
          {...register("notas")}
        />
      </div>

      <Button type="submit">Registrar Cita</Button>
    </form>
  );
}
