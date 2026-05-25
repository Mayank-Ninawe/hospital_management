import { Person } from './Person';
export type NurseShift = 'Morning' | 'Evening' | 'Night';
export interface Nurse extends Person {
  shift: NurseShift;
}
