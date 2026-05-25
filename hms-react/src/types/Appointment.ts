export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled';
export interface Appointment {
  id: number;
  patientid: number;
  patientName: string;
  doctorid: number;
  doctorName: string;
  date: string;
  time?: string;
  status: AppointmentStatus;
  notes?: string;
}
