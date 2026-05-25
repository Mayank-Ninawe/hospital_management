import { create } from 'zustand';
const generateId = () => Math.random().toString(36).substring(2, 9);
const API_BASE = 'http://localhost:8080/api';
export const useHMSStore = create((set, get) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    patients: [],
    doctors: [],
    nurses: [],
    appointments: [],
    rooms: [
        { num: 101, type: 'ICU', patientId: 'P201', patientName: 'Shaivee Kumar', status: 'occupied', allocatedAt: new Date().toISOString() },
        { num: 201, type: 'Emergency', status: 'vacant' }
    ],
    activityLog: [
        { id: '1', message: 'System connected to Spring Boot API.', timestamp: new Date().toISOString(), color: 'blue', category: 'system' }
    ],
    log: (message, color, category) => set((state) => {
        const newLog = {
            id: generateId(),
            message,
            timestamp: new Date().toISOString(),
            color,
            category
        };
        const logList = [newLog, ...state.activityLog].slice(0, 100);
        return { activityLog: logList };
    }),
    clearLog: () => set({ activityLog: [] }),
    fetchAllData: async () => {
        try {
            const [ptRes, drRes, nrRes, apRes] = await Promise.all([
                fetch(`${API_BASE}/patients`),
                fetch(`${API_BASE}/doctors`),
                fetch(`${API_BASE}/nurses`),
                fetch(`${API_BASE}/appointments`)
            ]);
            const patientsRaw = await ptRes.json();
            const doctorsRaw = await drRes.json();
            const nursesRaw = await nrRes.json();
            const appointsRaw = await apRes.json();
            // Mappings
            const patients = patientsRaw.map((p) => ({
                id: p.id, name: p.name, age: p.age,
                status: p.isAdmitted ? 'admitted' : 'discharged',
                admittedAt: new Date().toISOString(),
                assignedDoctorId: p.assignedDoctor || '',
                assignedRoomId: p.roomNumber ? parseInt(p.roomNumber) : undefined
            }));
            const doctors = doctorsRaw.map((d) => ({
                id: d.id, name: d.name, age: d.age,
                specialty: d.specialization || 'General',
                available: d.status === 'Available',
                timing: d.timing || '9 AM - 5 PM'
            }));
            const nurses = nursesRaw.map((n) => ({
                id: n.id, name: n.name, age: n.age,
                shift: n.shift || 'Morning'
            }));
            const appointments = appointsRaw.map((a) => ({
                id: a.appointmentId,
                patientId: a.patientName,
                patientName: a.patientName,
                doctorId: a.doctorName,
                doctorName: a.doctorName,
                date: a.date,
                time: a.time,
                status: a.status || 'Scheduled',
                notes: a.notes
            }));
            set({ patients, doctors, nurses, appointments });
            get().log('Data synced from backend database.', 'green', 'system');
        }
        catch (e) {
            console.error(e);
            get().log('Failed to fetch data from backend.', 'red', 'system');
        }
    },
    addPatient: async (patient) => {
        try {
            const pPayload = {
                id: patient.id,
                name: patient.name,
                age: patient.age,
                gender: "Other",
                diagnosis: "General",
                assignedDoctor: patient.assignedDoctorId || "",
                roomNumber: patient.assignedRoomId ? patient.assignedRoomId.toString() : "",
                bloodGroup: "O+",
                contact: "0000000000",
                isAdmitted: patient.status === 'admitted'
            };
            await fetch(`${API_BASE}/patients`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pPayload)
            });
            set((state) => ({ patients: [...state.patients, patient] }));
            get().log(`Patient ${patient.id} (${patient.name}) added.`, 'green', 'patient');
        }
        catch (e) { }
    },
    dischargePatient: async (id) => {
        const state = get();
        const patientIndex = state.patients.findIndex((p) => p.id === id);
        if (patientIndex === -1)
            return;
        try {
            // It deletes from real DB, but to "discharge" we could just update the patient status if there's an API, 
            // but the Java backend deletePatient does a real DELETE. Let's just update locally and not delete from DB, 
            // or we can invoke delete API if we actually want to delete. By the nature of HMS, discharging might just update. 
            // I'll call delete API since that exists!
            await fetch(`${API_BASE}/patients/${id}`, { method: 'DELETE' });
            const patient = state.patients[patientIndex];
            const roomId = patient.assignedRoomId;
            const updatedPatients = [...state.patients];
            updatedPatients[patientIndex] = { ...patient, status: 'discharged', assignedRoomId: undefined };
            set({ patients: updatedPatients });
            get().log(`Patient ${id} discharged & removed from DB.`, 'orange', 'patient');
            if (roomId !== undefined)
                get().vacateRoom(roomId);
        }
        catch (e) { }
    },
    addDoctor: async (doctor) => {
        try {
            const dPayload = {
                id: doctor.id, name: doctor.name, age: doctor.age,
                specialization: doctor.specialty, department: "General",
                timing: doctor.timing, status: doctor.available ? "Available" : "Off Duty",
                phone: "0000000000"
            };
            await fetch(`${API_BASE}/doctors`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dPayload)
            });
            set((state) => ({ doctors: [...state.doctors, doctor] }));
            get().log(`Doctor ${doctor.id} (${doctor.name}) added.`, 'blue', 'doctor');
        }
        catch (e) { }
    },
    removeDoctor: async (id) => {
        try {
            await fetch(`${API_BASE}/doctors/${id}`, { method: 'DELETE' });
            set((state) => ({ doctors: state.doctors.filter((d) => d.id !== id) }));
            get().log(`Doctor ${id} removed.`, 'red', 'doctor');
        }
        catch (e) { }
    },
    toggleDoctorAvailability: (id) => {
        // We could POST again to update
        const state = get();
        const doc = state.doctors.find((d) => d.id === id);
        if (doc) {
            const newAvail = !doc.available;
            const dPayload = {
                id: doc.id, name: doc.name, age: doc.age,
                specialization: doc.specialty, department: "General",
                timing: doc.timing, status: newAvail ? "Available" : "Off Duty",
                phone: "0000000000"
            };
            fetch(`${API_BASE}/doctors`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dPayload)
            }).catch(e => { });
            set((state) => ({
                doctors: state.doctors.map((d) => d.id === id ? { ...d, available: newAvail } : d)
            }));
            get().log(`Doctor ${doc.name} marked as ${newAvail ? 'Available' : 'Off Duty'}.`, 'blue', 'doctor');
        }
    },
    addNurse: async (nurse) => {
        try {
            const nPayload = {
                id: nurse.id, name: nurse.name, age: nurse.age,
                ward: "General", shift: nurse.shift,
                certification: "RN", status: "Active"
            };
            await fetch(`${API_BASE}/nurses`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nPayload)
            });
            set((state) => ({ nurses: [...state.nurses, nurse] }));
            get().log(`Nurse ${nurse.id} (${nurse.name}) added.`, 'blue', 'nurse');
        }
        catch (e) { }
    },
    removeNurse: async (id) => {
        try {
            await fetch(`${API_BASE}/nurses/${id}`, { method: 'DELETE' });
            set((state) => ({ nurses: state.nurses.filter((n) => n.id !== id) }));
            get().log(`Nurse ${id} removed.`, 'red', 'nurse');
        }
        catch (e) { }
    },
    bookAppointment: async (appointment) => {
        try {
            const aPayload = {
                appointmentId: appointment.id,
                patientName: appointment.patientName,
                doctorName: appointment.doctorName,
                date: appointment.date,
                time: appointment.time || "10:00 AM",
                type: "General Checkup",
                notes: appointment.notes || "",
                status: "Scheduled"
            };
            await fetch(`${API_BASE}/appointments`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(aPayload)
            });
            set((state) => ({ appointments: [...state.appointments, appointment] }));
            get().log(`Appointment ${appointment.id} booked for Patient ${appointment.patientName} with Doctor ${appointment.doctorName}.`, 'green', 'appointment');
        }
        catch (e) { }
    },
    cancelAppointment: async (id) => {
        try {
            await fetch(`${API_BASE}/appointments/${id}`, { method: 'DELETE' });
            set((state) => {
                const updatedAppointments = state.appointments.map((a) => a.id === id ? { ...a, status: 'Cancelled' } : a);
                return { appointments: updatedAppointments };
            });
            get().log(`Appointment ${id} cancelled.`, 'red', 'appointment');
        }
        catch (e) { }
    },
    completeAppointment: (id) => {
        // Could send an update to backend...
        set((state) => {
            const updatedAppointments = state.appointments.map((a) => a.id === id ? { ...a, status: 'Completed' } : a);
            return { appointments: updatedAppointments };
        });
        get().log(`Appointment ${id} completed.`, 'green', 'appointment');
    },
    allocateRoom: (room) => {
        set((state) => {
            const existingIndex = state.rooms.findIndex((r) => r.num === room.num);
            if (existingIndex >= 0) {
                const updatedRooms = [...state.rooms];
                updatedRooms[existingIndex] = room;
                return { rooms: updatedRooms };
            }
            return { rooms: [...state.rooms, room] };
        });
        get().log(`Room ${room.num} allocated.`, 'purple', 'room');
    },
    vacateRoom: (num) => {
        set((state) => {
            const updatedRooms = state.rooms.map((r) => r.num === num
                ? { ...r, status: 'vacant', patientId: undefined, patientName: undefined, allocatedAt: undefined }
                : r);
            return { rooms: updatedRooms };
        });
        get().log(`Room ${num} vacated.`, 'orange', 'room');
    },
    deleteRoom: (num) => {
        set((state) => ({ rooms: state.rooms.filter((r) => r.num !== num) }));
        get().log(`Room ${num} deleted.`, 'red', 'room');
    }
}));
