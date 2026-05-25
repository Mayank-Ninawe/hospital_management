import { Person } from './Person';
export type PatientStatus = 'admitted' | 'discharged' | 'critical';
export interface Patient extends Person {
  status: PatientStatus;
  admittedAt: string;   // ISO date string
  assignedDoctorId?: number;
  assignedRoomId?: number;
}
