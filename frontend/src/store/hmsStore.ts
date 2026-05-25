import { create } from 'zustand';
import { useAuthStore } from './authStore';
import { Patient, Doctor, Nurse, Room, Appointment } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

interface HMSState {
  patients: Patient[];
  doctors: Doctor[];
  nurses: Nurse[];
  rooms: Room[];
  appointments: Appointment[];
  loading: boolean;
  error: string | null;

  fetchPatients: () => Promise<void>;
  addPatient: (patient: Patient) => Promise<void>;
  dischargePatient: (id: number) => Promise<void>;

  fetchDoctors: () => Promise<void>;
  addDoctor: (doctor: Doctor) => Promise<void>;
  deleteDoctor: (id: number) => Promise<void>;

  // Similar functions can be modeled identically for Nurses, Rooms, and Appointments
}

export const useHmsStore = create<HMSState>((set, get) => ({
  patients: [],
  doctors: [],
  nurses: [],
  rooms: [],
  appointments: [],
  loading: false,
  error: null,

  fetchPatients: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/patients`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to fetch patients');
      const data = await res.json();
      set({ patients: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'An error occurred', loading: false });
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
    } catch (err: any) {
      set({ error: err.message || 'An error occurred', loading: false });
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
    } catch (err: any) {
        set({ error: err.message || 'An error occurred', loading: false });
    }
  },

  fetchDoctors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/doctors`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to fetch doctors');
      const data = await res.json();
      set({ doctors: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'An error occurred', loading: false });
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
    } catch (err: any) {
      set({ error: err.message || 'An error occurred', loading: false });
    }
  },

  deleteDoctor: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/doctors/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + useAuthStore.getState().token } });
      if (!res.ok) throw new Error('Failed to delete doctor');
      set((state) => ({
        doctors: state.doctors.filter((d) => d.id !== id),
        loading: false
      }));
    } catch (err: any) {
      set({ error: err.message || 'An error occurred', loading: false });
    }
  },
}));
