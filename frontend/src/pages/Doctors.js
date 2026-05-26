import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { UserPlus, Hash, Fingerprint, Stethoscope, Clock } from 'lucide-react';
import { useHmsStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { LiquidGlassInput } from '../components/ui/LiquidGlassInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';
export default function Doctors() {
    const { doctors, addDoctor, removeDoctor, toggleDoctorAvailability } = useHmsStore();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: '',
        specialty: 'General',
        timing: '9 AM – 5 PM',
        available: true
    });
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Full name is required';
        if (!formData.id.trim()) {
            newErrors.id = 'Doctor ID is required';
        }
        else if (doctors.some(d => d.id === Number(formData.id))) {
            newErrors.id = 'Doctor ID must be unique';
        }
        const ageNum = parseInt(formData.age);
        if (!formData.age) {
            newErrors.age = 'Age is required';
        }
        else if (isNaN(ageNum) || ageNum < 0 || ageNum > 100) {
            newErrors.age = 'Age must be between 0 and 100';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleAddDoctor = () => {
        if (validate()) {
            const newDoctor = {
                id: Number(formData.id),
                name: formData.name,
                age: parseInt(formData.age),
                specialty: formData.specialty,
                timing: formData.timing || '9 AM – 5 PM',
                available: formData.available
            };
            addDoctor(newDoctor);
            showToast(`Dr. ${newDoctor.name} registered successfully.`, 'success');
            setIsModalOpen(false);
            setFormData({ id: '', name: '', age: '', specialty: 'General', timing: '9 AM – 5 PM', available: true });
            setErrors({});
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "font-display text-2xl text-white", children: "Doctors" }), _jsx(LiquidGlassButton, { variant: "primary", size: "md", icon: _jsx(UserPlus, { size: 14 }), onClick: () => setIsModalOpen(true), children: "Add Doctor" })] }), _jsx("div", { className: "mb-4", children: _jsx(LiquidGlassInput, { placeholder: "Search by name...", value: searchTerm, onChange: e => setSearchTerm(e.target.value) }) }), doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (_jsx(EmptyState, { icon: _jsx(Stethoscope, { className: "w-8 h-8" }), message: "No doctors currently registered", action: { label: 'Add Doctor', onClick: () => setIsModalOpen(true) } })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map(doc => (_jsxs(LiquidGlassCard, { hoverable: true, className: "p-5 flex flex-col group", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("div", { className: "font-display text-lg text-white", children: doc.name }), _jsx("div", { className: "font-mono text-xs text-white/40 mt-0.5", children: doc.id })] }), _jsx(Badge, { label: doc.available ? 'Available' : 'Off Duty', variant: doc.available ? 'green' : 'red' })] }), _jsxs("div", { className: "flex items-center gap-2 mt-3", children: [_jsx(Stethoscope, { className: "w-[14px] h-[14px] text-teal-400" }), _jsx(Badge, { label: doc.specialty, variant: "blue" }), _jsx("span", { className: "text-white/20", children: "\u2022" }), _jsxs("span", { className: "text-xs text-white/40", children: [doc.age, " yrs"] })] }), _jsxs("div", { className: "flex items-center justify-between mt-auto pt-4 border-t border-white/8", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Clock, { className: "w-[14px] h-[14px] text-white/40" }), _jsx(Badge, { label: doc.timing, variant: "amber" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => toggleDoctorAvailability(doc.id), className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded transition-colors", children: "Toggle" }), _jsx(LiquidGlassButton, { variant: "danger", size: "sm", onClick: () => { removeDoctor(doc.id); showToast(`Dr. ${doc.name} removed.`, 'info'); }, children: "Remove" })] })] })] }, doc.id))) })), _jsxs(Modal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: "Add Doctor", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(LiquidGlassInput, { label: "Full Name", value: formData.name, onChange: e => setFormData({ ...formData, name: e.target.value }), icon: _jsx(UserPlus, { className: "w-4 h-4" }), error: errors.name, placeholder: "Dr. Smith", required: true }), _jsx(LiquidGlassInput, { label: "Age", type: "number", min: 0, max: 100, value: formData.age, onChange: e => setFormData({ ...formData, age: e.target.value }), icon: _jsx(Hash, { className: "w-4 h-4" }), error: errors.age, placeholder: "45", required: true }), _jsx(LiquidGlassInput, { label: "Doctor ID", value: formData.id, onChange: e => setFormData({ ...formData, id: e.target.value }), icon: _jsx(Fingerprint, { className: "w-4 h-4" }), placeholder: "e.g. D101", error: errors.id, required: true }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Specialty" }), _jsx("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer", value: formData.specialty, onChange: e => setFormData({ ...formData, specialty: e.target.value }), children: ['General', 'Surgery', 'Cardiology', 'Neurology', 'Pediatrics', 'Emergency'].map(spec => _jsx("option", { className: "bg-slate-900", value: spec, children: spec }, spec)) })] }), _jsx(LiquidGlassInput, { label: "Timing", value: formData.timing, onChange: e => setFormData({ ...formData, timing: e.target.value }), placeholder: "9 AM \u2013 5 PM" }), _jsxs("div", { className: "flex flex-col gap-1 justify-center", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Available Currently" }), _jsxs("label", { className: "relative inline-flex items-center cursor-pointer mt-2 w-max", children: [_jsx("input", { type: "checkbox", className: "sr-only peer", checked: formData.available, onChange: e => setFormData({ ...formData, available: e.target.checked }) }), _jsx("div", { className: "w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6 pt-4 border-t border-white/5", children: [_jsx(LiquidGlassButton, { variant: "ghost", onClick: () => setIsModalOpen(false), children: "Cancel" }), _jsx(LiquidGlassButton, { variant: "primary", onClick: handleAddDoctor, children: "Add Doctor" })] })] })] }));
}
