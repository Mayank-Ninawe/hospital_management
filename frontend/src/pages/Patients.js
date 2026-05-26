import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { UserPlus, Users, Hash, Fingerprint } from 'lucide-react';
import { useHmsStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { LiquidGlassInput } from '../components/ui/LiquidGlassInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';
export default function Patients() {
    const { patients, doctors, addPatient, dischargePatient } = useHmsStore();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // Form State
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: '',
        assignedDoctorId: '',
        status: 'admitted'
    });
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Full name is required';
        if (!formData.id.trim()) {
            newErrors.id = 'Patient ID is required';
        }
        else if (patients.some(p => p.id === Number(formData.id))) {
            newErrors.id = 'Patient ID must be unique';
        }
        const ageNum = parseInt(formData.age);
        if (!formData.age) {
            newErrors.age = 'Age is required';
        }
        else if (isNaN(ageNum) || ageNum < 0 || ageNum > 130) {
            newErrors.age = 'Age must be between 0 and 130';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleAddPatient = () => {
        if (validate()) {
            const newPatient = {
                id: Number(formData.id),
                name: formData.name,
                age: parseInt(formData.age),
                status: formData.status,
                assignedDoctorId: formData.assignedDoctorId ? Number(formData.assignedDoctorId) : undefined,
                admittedAt: new Date().toISOString()
            };
            addPatient(newPatient);
            showToast(`Patient ${newPatient.name} added successfully.`, 'success');
            setIsModalOpen(false);
            setFormData({
                id: '',
                name: '',
                age: '',
                assignedDoctorId: '',
                status: 'admitted'
            });
            setErrors({});
        }
    };
    const handleDischarge = (id, name) => {
        dischargePatient(id);
        showToast(`Patient ${name} discharged.`, 'info');
    };
    const getStatusVariant = (status) => {
        switch (status) {
            case 'admitted': return 'green';
            case 'discharged': return 'gray';
            case 'critical': return 'red';
            default: return 'gray';
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "font-display text-2xl text-white", children: "Patients" }), _jsx(LiquidGlassButton, { variant: "primary", size: "md", icon: _jsx(UserPlus, { size: 14 }), onClick: () => setIsModalOpen(true), children: "Add Patient" })] }), _jsx("div", { className: "mb-4", children: _jsx(LiquidGlassInput, { placeholder: "Search by name...", value: searchTerm, onChange: e => setSearchTerm(e.target.value) }) }), _jsx(LiquidGlassCard, { className: "p-0 overflow-hidden", children: patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (_jsx(EmptyState, { icon: _jsx(Users, { className: "w-8 h-8" }), message: "No patients admitted", action: { label: "Add Patient", onClick: () => setIsModalOpen(true) } })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-white/5 text-[11px] uppercase tracking-wider text-white/40", children: [_jsx("th", { className: "px-4 py-3 font-medium", children: "ID" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Name" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Age" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Assigned Doctor" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Room" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Status" }), _jsx("th", { className: "px-4 py-3 font-medium text-right", children: "Actions" })] }) }), _jsx("tbody", { children: patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(patient => {
                                    const assignedDoc = doctors.find(d => d.id === patient.assignedDoctorId);
                                    return (_jsxs("tr", { className: "border-b border-white/5 text-sm text-white group transition-all duration-150 hover:bg-white/[0.03] animate-[rowIn_200ms_ease]", children: [_jsx("td", { className: "px-4 py-4 font-mono text-xs text-white/40", children: patient.id }), _jsx("td", { className: "px-4 py-4 font-medium text-white", children: patient.name }), _jsx("td", { className: "px-4 py-4 text-white/70", children: patient.age }), _jsx("td", { className: "px-4 py-4 text-white/70", children: assignedDoc ? assignedDoc.name : '—' }), _jsx("td", { className: "px-4 py-4 text-white/70", children: patient.assignedRoomId ?? '—' }), _jsx("td", { className: "px-4 py-4", children: _jsx(Badge, { label: patient.status, variant: getStatusVariant(patient.status) }) }), _jsx("td", { className: "px-4 py-4 text-right flex justify-end", children: _jsx(LiquidGlassButton, { variant: "danger", size: "sm", disabled: patient.status === 'discharged', onClick: () => handleDischarge(patient.id, patient.name), children: "Discharge" }) })] }, patient.id));
                                }) })] }) })) }), _jsxs(Modal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: "Add Patient", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(LiquidGlassInput, { label: "Full Name", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), icon: _jsx(UserPlus, { className: "w-4 h-4" }), error: errors.name, placeholder: "John Doe", required: true }), _jsx(LiquidGlassInput, { label: "Age", type: "number", min: 0, max: 130, value: formData.age, onChange: (e) => setFormData({ ...formData, age: e.target.value }), icon: _jsx(Hash, { className: "w-4 h-4" }), error: errors.age, placeholder: "30", required: true }), _jsx(LiquidGlassInput, { label: "Patient ID", value: formData.id, onChange: (e) => setFormData({ ...formData, id: e.target.value }), icon: _jsx(Fingerprint, { className: "w-4 h-4" }), placeholder: "e.g. P201", error: errors.id, required: true }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Assigned Doctor" }), _jsxs("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer", value: formData.assignedDoctorId, onChange: (e) => setFormData({ ...formData, assignedDoctorId: e.target.value }), children: [_jsx("option", { className: "bg-slate-900", value: "", children: "\u2014 Unassigned \u2014" }), doctors.map(doc => (_jsxs("option", { className: "bg-slate-900", value: doc.id, children: [doc.name, " (", doc.specialty, ")"] }, doc.id)))] })] }), _jsxs("div", { className: "flex flex-col gap-1 md:col-span-2", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Status" }), _jsxs("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer", value: formData.status, onChange: (e) => setFormData({ ...formData, status: e.target.value }), children: [_jsx("option", { className: "bg-slate-900", value: "admitted", children: "Admitted" }), _jsx("option", { className: "bg-slate-900", value: "critical", children: "Critical" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6 pt-4 border-t border-white/5", children: [_jsx(LiquidGlassButton, { variant: "ghost", onClick: () => setIsModalOpen(false), children: "Cancel" }), _jsx(LiquidGlassButton, { variant: "primary", onClick: handleAddPatient, children: "Add Patient" })] })] })] }));
}
