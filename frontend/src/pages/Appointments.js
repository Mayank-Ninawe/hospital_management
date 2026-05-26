import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { CalendarPlus, CalendarDays, CheckCircle2, XCircle } from 'lucide-react';
import { useHmsStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';
export default function Appointments() {
    const { appointments, patients, doctors, bookAppointment, cancelAppointment, completeAppointment } = useHmsStore();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
    });
    const handleBook = () => {
        if (!formData.patientId || !formData.doctorId || !formData.date || !formData.time) {
            showToast('Please fill all fields', 'error');
            return;
        }
        const patient = patients.find(p => p.id === parseInt(formData.patientId));
        const doctor = doctors.find(d => d.id === parseInt(formData.doctorId));
        const newAppointment = {
            patientName: patient?.name || "Unknown",
            doctorName: doctor?.name || "Unknown",
            id: Math.floor(Math.random() * 1000000),
            patientid: parseInt(formData.patientId),
            doctorid: parseInt(formData.doctorId),
            date: formData.date,
            time: formData.time,
            status: 'Scheduled',
        };
        bookAppointment(newAppointment);
        showToast('Appointment booked successfully', 'success');
        setIsModalOpen(false);
        setFormData({ patientId: '', doctorId: '', date: '', time: '' });
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'Scheduled': return 'blue';
            case 'Completed': return 'green';
            case 'Cancelled': return 'red';
            default: return 'gray';
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "font-display text-2xl text-white", children: "Appointments" }), _jsx(LiquidGlassButton, { variant: "primary", size: "md", icon: _jsx(CalendarPlus, { size: 14 }), onClick: () => setIsModalOpen(true), children: "Book Appointment" })] }), appointments.length === 0 ? (_jsx(EmptyState, { icon: _jsx(CalendarDays, { className: "w-8 h-8" }), message: "No appointments scheduled", action: { label: 'Book Appointment', onClick: () => setIsModalOpen(true) } })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: appointments.map(apt => {
                    const patient = patients.find(p => p.id === apt.patientid);
                    const doctor = doctors.find(d => d.id === apt.doctorid);
                    return (_jsxs(LiquidGlassCard, { className: "p-5 flex flex-col h-full animate-[rowIn_200ms_ease]", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("span", { className: "font-mono font-bold text-white text-base", children: ["#", apt.id] }), _jsx(Badge, { label: apt.status, variant: getStatusColor(apt.status) })] }), _jsxs("div", { className: "space-y-2 flex-1", children: [_jsxs("div", { children: [_jsx("span", { className: "text-xs text-white/50 block", children: "Date & Time" }), _jsxs("span", { className: "text-sm text-white font-medium", children: [apt.date, " at ", apt.time] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-xs text-white/50 block", children: "Patient" }), _jsx("span", { className: "text-sm text-white", children: patient?.name || apt.patientid })] }), _jsxs("div", { children: [_jsx("span", { className: "text-xs text-white/50 block", children: "Doctor" }), _jsx("span", { className: "text-sm text-white", children: doctor?.name || apt.doctorid })] })] }), apt.status === 'Scheduled' && (_jsxs("div", { className: "mt-4 pt-4 border-t border-white/5 flex gap-2", children: [_jsx(LiquidGlassButton, { variant: "ghost", size: "sm", className: "flex-1", onClick: () => {
                                            completeAppointment(apt.id);
                                            showToast('Appointment completed', 'success');
                                        }, icon: _jsx(CheckCircle2, { size: 14, className: "text-green-400" }), children: "Complete" }), _jsx(LiquidGlassButton, { variant: "danger", size: "sm", className: "flex-1", onClick: () => {
                                            cancelAppointment(apt.id);
                                            showToast('Appointment cancelled', 'info');
                                        }, icon: _jsx(XCircle, { size: 14 }), children: "Cancel" })] }))] }, apt.id));
                }) })), _jsxs(Modal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: "Book Appointment", children: [_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Patient" }), _jsxs("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5", value: formData.patientId, onChange: e => setFormData({ ...formData, patientId: e.target.value }), children: [_jsx("option", { className: "bg-slate-900", value: "", children: "Select Patient" }), patients.map(p => (_jsxs("option", { className: "bg-slate-900", value: p.id, children: [p.name, " (", p.id, ")"] }, p.id)))] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Doctor" }), _jsxs("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5", value: formData.doctorId, onChange: e => setFormData({ ...formData, doctorId: e.target.value }), children: [_jsx("option", { className: "bg-slate-900", value: "", children: "Select Doctor" }), doctors.map(d => (_jsxs("option", { className: "bg-slate-900", value: d.id, children: [d.name, " (", d.specialty, ")"] }, d.id)))] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Date" }), _jsx("input", { type: "date", className: "liquid-glass w-full rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none border border-white/5", value: formData.date, onChange: e => setFormData({ ...formData, date: e.target.value }) })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Time" }), _jsx("input", { type: "time", className: "liquid-glass w-full rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none border border-white/5", value: formData.time, onChange: e => setFormData({ ...formData, time: e.target.value }) })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6 pt-4 border-t border-white/5", children: [_jsx(LiquidGlassButton, { variant: "ghost", onClick: () => setIsModalOpen(false), children: "Cancel" }), _jsx(LiquidGlassButton, { variant: "primary", onClick: handleBook, children: "Book" })] })] })] }));
}
