import { Person } from './Person';
export type Specialty = 'General' | 'Surgery' | 'Cardiology' | 'Neurology' | 'Pediatrics' | 'Emergency';
export interface Doctor extends Person {
  specialty: Specialty;
  available: boolean;
  timing: string;  // e.g. "9 AM – 5 PM"
}
