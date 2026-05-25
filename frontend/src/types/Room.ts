export type RoomType = 'ICU' | 'Emergency' | 'General';
export type RoomStatus = 'occupied' | 'vacant' | 'maintenance';
export interface Room {
  num: number;
  type: RoomType;
  patientId?: number;
  patientName?: string;
  status: RoomStatus;
  allocatedAt?: string;
}
