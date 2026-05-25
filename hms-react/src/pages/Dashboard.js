import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, CalendarDays, Activity } from 'lucide-react';
import { useHMSStore } from '../store/hmsStore';
import { KPICard } from '../components/dashboard/KPICard';
import { ActivityLog } from '../components/dashboard/ActivityLog';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
export default function Dashboard() {
    const { patients, doctors, nurses, rooms, appointments, activityLog } = useHMSStore();
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
    const scheduledAppointments = appointments.filter(a => a.status === 'Scheduled').length;
    const recentPatients = [...patients].reverse().slice(0, 5);
    const upcomingAppointments = [...appointments].filter(a => a.status === 'Scheduled').slice(0, 5);
    const getStatusVariant = (status) => {
        switch (status) {
            case 'admitted': return 'teal';
            case 'discharged': return 'gray';
            case 'critical': return 'red';
            default: return 'gray';
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: [_jsx(KPICard, { label: "Total Patients", value: patients.length, accentColor: "teal" }), _jsx(KPICard, { label: "Doctors on Staff", value: doctors.length, accentColor: "blue" }), _jsx(KPICard, { label: "Nurses", value: nurses.length, accentColor: "purple" }), _jsx(KPICard, { label: "Rooms Occupied", value: `${occupiedRooms}/${rooms.length}`, accentColor: "amber" }), _jsx(KPICard, { label: "Appointments", value: scheduledAppointments, accentColor: "green", sub: "Scheduled" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(LiquidGlassCard, { className: "rounded-2xl flex flex-col p-0 overflow-hidden", children: [_jsx("div", { className: "p-4 border-b border-white/5", children: _jsx("h2", { className: "font-display text-base font-semibold text-white", children: "Recent Patients" }) }), _jsx("div", { className: "flex-1 p-4 flex flex-col", children: recentPatients.length === 0 ? (_jsx(EmptyState, { icon: _jsx(Users, { className: "w-8 h-8" }), message: "No recent patients." })) : (_jsx("div", { className: "flex flex-col", children: recentPatients.map((patient, idx) => (_jsxs("div", { className: `flex items-center gap-4 py-3 ${idx !== recentPatients.length - 1 ? 'border-b border-white/5' : ''}`, children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-sm text-white", children: patient.name }), _jsxs("div", { className: "text-xs text-white/40", children: ["ID: ", patient.id, " \u2022 Age: ", patient.age] })] }), _jsx(Badge, { label: patient.status, variant: getStatusVariant(patient.status) })] }, patient.id))) })) })] }), _jsxs(LiquidGlassCard, { className: "rounded-2xl flex flex-col p-0 overflow-hidden", children: [_jsx("div", { className: "p-4 border-b border-white/5", children: _jsx("h2", { className: "font-display text-base font-semibold text-white", children: "Upcoming Appointments" }) }), _jsx("div", { className: "flex-1 p-4 flex flex-col", children: upcomingAppointments.length === 0 ? (_jsx(EmptyState, { icon: _jsx(CalendarDays, { className: "w-8 h-8" }), message: "No upcoming appointments." })) : (_jsx("div", { className: "flex flex-col", children: upcomingAppointments.map((apt, idx) => (_jsxs("div", { className: `flex items-center gap-4 py-3 ${idx !== upcomingAppointments.length - 1 ? 'border-b border-white/5' : ''}`, children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-sm text-white", children: apt.patientName }), _jsxs("div", { className: "text-xs text-white/40", children: [apt.doctorName, " \u2022 ", new Date(apt.date).toLocaleString()] })] })] }, apt.id))) })) })] })] }), _jsxs(LiquidGlassCard, { className: "p-5 rounded-2xl", children: [_jsxs("h2", { className: "font-display text-base font-semibold text-white flex items-center gap-2 mb-4", children: [_jsx(Activity, { className: "w-4 h-4 text-blue-400" }), "Recent Activity"] }), _jsx(ActivityLog, { logs: activityLog })] })] }));
}
