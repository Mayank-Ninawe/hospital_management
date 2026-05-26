import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { UserPlus, Heart, Hash, Fingerprint } from 'lucide-react';
import { useHmsStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { LiquidGlassInput } from '../components/ui/LiquidGlassInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';
export default function Nurses() {
    const { nurses, addNurse, removeNurse } = useHmsStore();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: '',
        shift: 'Morning'
    });
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Full name is required';
        if (!formData.id.trim()) {
            newErrors.id = 'Nurse ID is required';
        }
        else if (nurses.some(n => n.id === parseInt(formData.id))) {
            newErrors.id = 'Nurse ID must be unique';
        }
        const ageNum = parseInt(formData.age);
        if (!formData.age) {
            newErrors.age = 'Age is required';
        }
        else if (isNaN(ageNum) || ageNum < 18 || ageNum > 70) {
            newErrors.age = 'Age must be between 18 and 70';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleAddNurse = () => {
        if (validate()) {
            const newNurse = {
                id: parseInt(formData.id),
                name: formData.name,
                age: parseInt(formData.age),
                shift: formData.shift
            };
            addNurse(newNurse);
            showToast(`Nurse ${newNurse.name} added to ${newNurse.shift} shift`, 'success');
            setIsModalOpen(false);
            setFormData({ id: '', name: '', age: '', shift: 'Morning' });
            setErrors({});
        }
    };
    const handleRemove = (id, name) => {
        if (window.confirm(`Are you sure you want to remove ${name} from the staff?`)) {
            removeNurse(id);
            showToast(`Nurse ${name} removed.`, 'info');
        }
    };
    const getShiftBadgeArgs = (shift) => {
        switch (shift) {
            case 'Morning': return { label: 'Morning (6AM–2PM)', variant: 'amber' };
            case 'Evening': return { label: 'Evening (2PM–10PM)', variant: 'blue' };
            case 'Night': return { label: 'Night (10PM–6AM)', variant: 'purple' };
            default: return { label: shift, variant: 'gray' };
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "font-display text-2xl text-white", children: "Nurses" }), _jsx(LiquidGlassButton, { variant: "primary", size: "md", icon: _jsx(UserPlus, { size: 14 }), onClick: () => setIsModalOpen(true), children: "Add Nurse" })] }), _jsx(LiquidGlassCard, { className: "p-0 overflow-hidden", children: nurses.length === 0 ? (_jsx(EmptyState, { icon: _jsx(Heart, { className: "w-8 h-8" }), message: "No nurses registered. Nursing schedules and staff records belong here.", action: { label: 'Add Nurse', onClick: () => setIsModalOpen(true) } })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-white/5 text-[11px] uppercase tracking-wider text-white/40", children: [_jsx("th", { className: "px-4 py-3 font-medium", children: "ID" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Name" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Age" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Shift" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Timing" }), _jsx("th", { className: "px-4 py-3 font-medium text-right", children: "Actions" })] }) }), _jsx("tbody", { children: nurses.map(nurse => {
                                    const shiftBadge = getShiftBadgeArgs(nurse.shift);
                                    return (_jsxs("tr", { className: "border-b border-white/5 text-sm text-white group transition-all duration-150 hover:bg-white/[0.03] animate-[rowIn_200ms_ease]", children: [_jsx("td", { className: "px-4 py-4 font-mono text-xs text-white/40", children: nurse.id }), _jsx("td", { className: "px-4 py-4 font-medium text-white", children: nurse.name }), _jsx("td", { className: "px-4 py-4 text-white/70", children: nurse.age }), _jsx("td", { className: "px-4 py-4", children: _jsx(Badge, { label: shiftBadge.label, variant: shiftBadge.variant }) }), _jsx("td", { className: "px-4 py-4", children: _jsx(Badge, { label: "24/7 \u00B7 Shift-based", variant: "gray" }) }), _jsx("td", { className: "px-4 py-4 text-right", children: _jsx(LiquidGlassButton, { variant: "danger", size: "sm", onClick: () => handleRemove(nurse.id, nurse.name), children: "Remove" }) })] }, nurse.id));
                                }) })] }) })) }), _jsxs(Modal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: "Add Nurse", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(LiquidGlassInput, { label: "Full Name", value: formData.name, onChange: e => setFormData({ ...formData, name: e.target.value }), icon: _jsx(UserPlus, { className: "w-4 h-4" }), error: errors.name, placeholder: "Nurse Joy", required: true }), _jsx(LiquidGlassInput, { label: "Age", type: "number", min: 18, max: 70, value: formData.age, onChange: e => setFormData({ ...formData, age: e.target.value }), icon: _jsx(Hash, { className: "w-4 h-4" }), error: errors.age, placeholder: "28", required: true }), _jsx(LiquidGlassInput, { label: "Nurse ID", value: formData.id, onChange: e => setFormData({ ...formData, id: e.target.value }), icon: _jsx(Fingerprint, { className: "w-4 h-4" }), placeholder: "e.g. N301", error: errors.id, required: true }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Shift" }), _jsxs("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer", value: formData.shift, onChange: e => setFormData({ ...formData, shift: e.target.value }), children: [_jsx("option", { className: "bg-slate-900", value: "Morning", children: "Morning (6AM\u20132PM)" }), _jsx("option", { className: "bg-slate-900", value: "Evening", children: "Evening (2PM\u201310PM)" }), _jsx("option", { className: "bg-slate-900", value: "Night", children: "Night (10PM\u20136AM)" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6 pt-4 border-t border-white/5", children: [_jsx(LiquidGlassButton, { variant: "ghost", onClick: () => setIsModalOpen(false), children: "Cancel" }), _jsx(LiquidGlassButton, { variant: "primary", onClick: handleAddNurse, children: "Add Nurse" })] })] })] }));
}
