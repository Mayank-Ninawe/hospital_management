import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { DoorOpen, Plus, UserCircle, Hash } from 'lucide-react';
import { useHmsStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';
export default function Rooms() {
    const { rooms, patients, allocateRoom, vacateRoom, deleteRoom } = useHmsStore();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        num: '',
        type: 'General',
        patientId: '',
        status: 'vacant'
    });
    const [errors, setErrors] = useState({});
    // Auto-set status to occupied if a patient is selected
    useEffect(() => {
        if (formData.patientId && formData.status !== 'occupied') {
            setFormData(prev => ({ ...prev, status: 'occupied' }));
        }
        else if (!formData.patientId && formData.status === 'occupied') {
            setFormData(prev => ({ ...prev, status: 'vacant' }));
        }
    }, [formData.patientId]);
    const totalCount = rooms.length;
    const occupiedCount = rooms.filter(r => r.status === 'occupied').length;
    const vacantCount = rooms.filter(r => r.status === 'vacant').length;
    const validate = () => {
        const newErrors = {};
        if (!formData.num) {
            newErrors.num = 'Room number is required';
        }
        else if (isNaN(Number(formData.num)) || Number(formData.num) < 1) {
            newErrors.num = 'Valid positive room number required';
        }
        else if (rooms.some(r => r.num === Number(formData.num))) {
            newErrors.num = 'Room number already exists';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleAllocate = () => {
        if (validate()) {
            const roomNum = Number(formData.num);
            let patientName;
            if (formData.patientId) {
                patientName = patients.find(p => p.id === Number(formData.patientId))?.name;
            }
            const newRoom = {
                num: roomNum,
                type: formData.type,
                status: formData.status,
                ...(formData.patientId ? { patientId: formData.patientId, patientName, allocatedAt: new Date().toISOString() } : {})
            };
            allocateRoom(newRoom);
            showToast(`Room #${roomNum} allocated successfully`, 'success');
            setIsModalOpen(false);
            setFormData({ num: '', type: 'General', patientId: '', status: 'vacant' });
            setErrors({});
        }
    };
    const handleDelete = (num) => {
        if (window.confirm(`Are you sure you want to delete Room #${num}?`)) {
            deleteRoom(num);
            showToast(`Room #${num} removed`, 'info');
        }
    };
    const getTypeVariant = (type) => {
        switch (type) {
            case 'ICU': return 'red';
            case 'Emergency': return 'amber';
            case 'General': return 'blue';
            default: return 'gray';
        }
    };
    const getTypeLabel = (type) => {
        switch (type) {
            case 'ICU': return 'Intensive Care Unit';
            case 'Emergency': return 'Emergency Room';
            case 'General': return 'General Ward';
            default: return type;
        }
    };
    // Patients who are admitted and not already in a room
    const availablePatients = patients.filter(p => p.status === 'admitted' && !rooms.some(r => r.patientId === p.id));
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "font-display text-2xl text-white", children: "Rooms" }), _jsx(LiquidGlassButton, { variant: "primary", size: "md", icon: _jsx(Plus, { size: 14 }), onClick: () => setIsModalOpen(true), children: "Allocate Room" })] }), _jsxs("div", { className: "flex items-center gap-3 mt-4 mb-6", children: [_jsxs("div", { className: "liquid-glass rounded-full px-4 py-1.5 text-xs text-white/60", children: [_jsx("span", { className: "text-white font-bold mr-1", children: totalCount }), " Total Rooms"] }), _jsxs("div", { className: "liquid-glass rounded-full px-4 py-1.5 text-xs text-white/60", children: [_jsx("span", { className: "text-green-400 font-bold mr-1", children: occupiedCount }), " Occupied"] }), _jsxs("div", { className: "liquid-glass rounded-full px-4 py-1.5 text-xs text-white/60", children: [_jsx("span", { className: "text-white/40 font-bold mr-1", children: vacantCount }), " Vacant"] })] }), rooms.length === 0 ? (_jsx(EmptyState, { icon: _jsx(DoorOpen, { className: "w-8 h-8" }), message: "No rooms allocated", action: { label: 'Allocate Room', onClick: () => setIsModalOpen(true) } })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: rooms.map(room => (_jsxs(LiquidGlassCard, { className: "p-5 flex flex-col h-full", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("div", { className: "font-mono font-bold text-white text-base", children: ["Room #", room.num] }), _jsx("div", { className: "text-xs text-white/30 mt-1", children: getTypeLabel(room.type) })] }), _jsx(Badge, { label: room.type, variant: getTypeVariant(room.type) })] }), _jsx("div", { className: "mt-4 flex-1", children: room.status === 'occupied' && room.patientName ? (_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(UserCircle, { className: "w-4 h-4 text-teal-400 mt-0.5 shrink-0" }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-white", children: room.patientName }), _jsx("div", { className: "text-xs text-white/30 mt-0.5", children: room.allocatedAt ? new Date(room.allocatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '' })] })] })) : (_jsx("div", { className: "text-sm text-white/25 italic", children: "Unoccupied" })) }), _jsxs("div", { className: "mt-3 flex items-center gap-1.5", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${room.status === 'occupied' ? 'bg-green-400' : room.status === 'maintenance' ? 'bg-amber-400' : 'bg-white/20'}` }), _jsx("span", { className: "text-xs text-white/50 capitalize", children: room.status })] }), _jsxs("div", { className: "mt-4 pt-4 border-t border-white/5 flex gap-2", children: [room.status === 'occupied' && (_jsx(LiquidGlassButton, { variant: "ghost", size: "sm", onClick: () => vacateRoom(room.num), className: "flex-1", children: "Vacate" })), _jsx(LiquidGlassButton, { variant: "danger", size: "sm", onClick: () => handleDelete(room.num), className: "flex-1", children: "Remove" })] })] }, room.num))) })), _jsxs(Modal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: "Allocate Room", children: [_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Room Number" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/30", children: _jsx(Hash, { size: 16 }) }), _jsx("input", { type: "number", min: "1", className: `liquid-glass w-full rounded-xl pl-10 pr-4 py-2.5 bg-transparent text-white text-sm outline-none border ${errors.num ? 'border-red-500/50' : 'border-white/5'}`, placeholder: "e.g. 101", value: formData.num, onChange: e => setFormData({ ...formData, num: e.target.value }) })] }), errors.num && _jsx("span", { className: "text-red-400 text-xs", children: errors.num })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Room Type" }), _jsxs("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5", value: formData.type, onChange: e => setFormData({ ...formData, type: e.target.value }), children: [_jsx("option", { className: "bg-slate-900", value: "General", children: "General Ward" }), _jsx("option", { className: "bg-slate-900", value: "ICU", children: "Intensive Care Unit" }), _jsx("option", { className: "bg-slate-900", value: "Emergency", children: "Emergency Room" })] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Assign Patient (Optional)" }), _jsxs("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5", value: formData.patientId, onChange: e => setFormData({ ...formData, patientId: e.target.value }), children: [_jsx("option", { className: "bg-slate-900", value: "", children: "\u2014 Leave Unoccupied \u2014" }), availablePatients.map(p => (_jsxs("option", { className: "bg-slate-900", value: p.id, children: [p.name, " (", p.id, ")"] }, p.id)))] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-white/50", children: "Status" }), _jsxs("select", { className: "liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5 opacity-80", value: formData.status, disabled: !!formData.patientId, onChange: e => setFormData({ ...formData, status: e.target.value }), children: [_jsx("option", { className: "bg-slate-900", value: "vacant", children: "Vacant" }), formData.patientId && _jsx("option", { className: "bg-slate-900", value: "occupied", children: "Occupied" }), !formData.patientId && _jsx("option", { className: "bg-slate-900", value: "maintenance", children: "Maintenance" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6 pt-4 border-t border-white/5", children: [_jsx(LiquidGlassButton, { variant: "ghost", onClick: () => setIsModalOpen(false), children: "Cancel" }), _jsx(LiquidGlassButton, { variant: "primary", onClick: handleAllocate, children: "Allocate Room" })] })] })] }));
}
