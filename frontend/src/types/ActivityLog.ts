export interface ActivityLog {
  id: string;
  message: string;
  timestamp: string;
  color: string;
  category: 'patient' | 'doctor' | 'nurse' | 'appointment' | 'room' | 'system';
}
