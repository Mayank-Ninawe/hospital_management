import { create } from 'zustand';
import { useAuthStore } from './authStore';
import { Patient, Doctor, Nurse, Room, Appointment, ActivityLog } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

interface HMSState {
  patients: Patient[];
  doctors: Doctor[];
  nurses: Nurse[];
  rooms: Room[];
  appointments: Appointment[];
  activityLog: ActivityLog[];
  loading: boolean;
  error: string | null;

  fetchPatients: () => Promise<void>;
  addPatient: (patient: Patient) => Promise<void>;
  dischargePatient: (id: number) => Promise<void>;

  fetchDoctors: () => Promise<void>;
  addDoctor: (doctor: Doctor) => Promise<void>;
  removeDoctor: (id: number) => Promise<void>;
  toggleDoctorAvailability: (id: number) => void;

  fetchNurses: () => Promise<void>;
  addNurse: (nurse: Nurse) => Promise<void>;
  removeNurse: (id: number) => Promise<void>;

  fetchRooms: () => Promise<void>;
  allocateRoom: (room: Room) => Promise<void>;
  vacateRoom: (num: number) => Promise<void>;
  deleteRoom: (num: number) => Promise<void>;

  fetchAppointments: () => Promise<void>;
  bookAppointment: (appointment: Appointment) => Promise<void>;
  cancelAppointment: (id: number) => Promise<void>;
  completeAppointment: (id: number) => Promise<void>;

  clearLog: () => void;
}

export const useHmsStore = create<HMSState>((set, get) => ({
  patients: [],
  doctors: [],
  nurses: [],
  rooms: [],
  appointments: [],
  activityLog: [],
  loading: false,
  error: null,

  fetchPatients: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/patients`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to fetch patients');
      const data = await res.json();
      set({ patients: data, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  addPatient: async (patient: Patient) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useAuthStore.getState().token },
        body: JSON.stringify(patient),
      });
      if (!res.ok) throw new Error('Failed to add patient');
      const newPatient = await res.json();
      set((state) => ({ patients: [...state.patients, newPatient], loading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  dischargePatient: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/patients/${id}/discharge`, { method: 'PUT', headers: { 'Authorization': 'Bearer ' + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to discharge patient');
      const updatedPatient = await res.json();
      set((state) => ({
        patients: state.patients.map((p) => p.id === updatedPatient.id ? updatedPatient : p),
        loading: false
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  fetchDoctors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/doctors`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to fetch doctors');
      const data = await res.json();
      set({ doctors: data, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  addDoctor: async (doctor: Doctor) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/doctors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useAuthStore.getState().token },
        body: JSON.stringify(doctor),
      });
      if (!res.ok) throw new Error('Failed to add doctor');
      const newDoctor = await res.json();
      set((state) => ({ doctors: [...state.doctors, newDoctor], loading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  removeDoctor: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/doctors/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to delete doctor');
      set((state) => ({
        doctors: state.doctors.filter((d) => d.id !== id),
        loading: false
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  toggleDoctorAvailability: (id: number) => {
    set((state) => ({
      doctors: state.doctors.map((d) => d.id === id ? { ...d, available: !d.available } : d)
    }));
  },

  fetchNurses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/nurses`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to fetch nurses');
      const data = await res.json();
      set({ nurses: data, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  addNurse: async (nurse: Nurse) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/nurses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useAuthStore.getState().token },
        body: JSON.stringify(nurse),
      });
      if (!res.ok) throw new Error('Failed to add nurse');
      const newNurse = await res.json();
      set((state) => ({ nurses: [...state.nurses, newNurse], loading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  removeNurse: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/nurses/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to delete nurse');
      set((state) => ({
        nurses: state.nurses.filter((n) => n.id !== id),
        loading: false
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/rooms`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to fetch rooms');
      const data = await res.json();
      const roomsList = data.map((dto: any) => ({
        num: dto.num,
        type: dto.type,
        status: dto.status.toLowerCase(),
        patientId: dto.patientId
      }));
      set({ rooms: roomsList, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  allocateRoom: async (room: Room) => {
    set({ loading: true, error: null });
    try {
      const dto = {
        num: room.num,
        type: room.type,
        status: room.status.toUpperCase(),
        patientId: room.patientId
      };
      const res = await fetch(`${API_BASE}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useAuthStore.getState().token },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw new Error('Failed to allocate room');
      const newRoomDto = await res.json();
      const newRoom: Room = {
        num: newRoomDto.num,
        type: newRoomDto.type,
        status: newRoomDto.status.toLowerCase(),
        patientId: newRoomDto.patientId,
        patientName: room.patientName,
        allocatedAt: room.allocatedAt
      };
      set((state) => ({ rooms: [...state.rooms, newRoom], loading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  vacateRoom: async (num: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/rooms/${num}/vacate`, {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + useAuthStore.getState().token }
      });
      if (!res.ok) throw new Error('Failed to vacate room');
      set((state) => ({
        rooms: state.rooms.map((r) => r.num === num ? { ...r, status: 'vacant', patientId: undefined, patientName: undefined, allocatedAt: undefined } : r),
        loading: false
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  deleteRoom: async (num: number) => {
    set((state) => ({
      rooms: state.rooms.filter((r) => r.num !== num)
    }));
  },

  fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/appointments`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      set({ appointments: data, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  bookAppointment: async (appointment: Appointment) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useAuthStore.getState().token },
        body: JSON.stringify(appointment),
      });
      if (!res.ok) throw new Error('Failed to book appointment');
      const newAppointment = await res.json();
      set((state) => ({ appointments: [...state.appointments, newAppointment], loading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  cancelAppointment: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useAuthStore.getState().token },
        body: 'Cancelled'
      });
      if (!res.ok) throw new Error('Failed to cancel appointment');
      const updated = await res.json();
      set((state) => ({
        appointments: state.appointments.map((a) => a.id === id ? updated : a),
        loading: false
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  completeAppointment: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useAuthStore.getState().token },
        body: 'Completed'
      });
      if (!res.ok) throw new Error('Failed to complete appointment');
      const updated = await res.json();
      set((state) => ({
        appointments: state.appointments.map((a) => a.id === id ? updated : a),
        loading: false
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      set({ error: message, loading: false });
    }
  },

  clearLog: () => {
    set({ activityLog: [] });
  }
}));
