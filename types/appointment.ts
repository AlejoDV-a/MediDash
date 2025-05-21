

 

export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  date: string; // formato ISO
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
};
