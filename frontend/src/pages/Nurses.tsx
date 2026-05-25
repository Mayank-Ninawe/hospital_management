import React, { useState } from 'react';
import { UserPlus, Heart, Hash, Fingerprint } from 'lucide-react';
import { useHmsStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { LiquidGlassInput } from '../components/ui/LiquidGlassInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { Nurse, NurseShift } from '../types';

export default function Nurses() {
  const { nurses, addNurse, removeNurse } = useHmsStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    shift: 'Morning' as NurseShift
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!formData.id.trim()) {
      newErrors.id = 'Nurse ID is required';
    } else if (nurses.some(n => n.id === parseInt(formData.id))) {
      newErrors.id = 'Nurse ID must be unique';
    }

    const ageNum = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(ageNum) || ageNum < 18 || ageNum > 70) {
      newErrors.age = 'Age must be between 18 and 70';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddNurse = () => {
    if (validate()) {
      const newNurse: Nurse = {
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

  const handleRemove = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the staff?`)) {
      removeNurse(id);
      showToast(`Nurse ${name} removed.`, 'info');
    }
  };

  const getShiftBadgeArgs = (shift: NurseShift) => {
    switch (shift) {
      case 'Morning': return { label: 'Morning (6AM–2PM)', variant: 'amber' as const };
      case 'Evening': return { label: 'Evening (2PM–10PM)', variant: 'blue' as const };
      case 'Night': return { label: 'Night (10PM–6AM)', variant: 'purple' as const };
      default: return { label: shift, variant: 'gray' as const };
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      
      {/* View header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-white">Nurses</h1>
        <LiquidGlassButton variant="primary" size="md" icon={<UserPlus size={14} />} onClick={() => setIsModalOpen(true)}>
          Add Nurse
        </LiquidGlassButton>
      </div>

      {/* Nurses Table */}
      <LiquidGlassCard className="p-0 overflow-hidden">
        {nurses.length === 0 ? (
          <EmptyState icon={<Heart className="w-8 h-8" />} message="No nurses registered. Nursing schedules and staff records belong here." action={{ label: 'Add Nurse', onClick: () => setIsModalOpen(true) }} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[11px] uppercase tracking-wider text-white/40">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Age</th>
                  <th className="px-4 py-3 font-medium">Shift</th>
                  <th className="px-4 py-3 font-medium">Timing</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {nurses.map(nurse => {
                  const shiftBadge = getShiftBadgeArgs(nurse.shift);
                  
                  return (
                    <tr key={nurse.id} className="border-b border-white/5 text-sm text-white group transition-all duration-150 hover:bg-white/[0.03] animate-[rowIn_200ms_ease]">
                      <td className="px-4 py-4 font-mono text-xs text-white/40">{nurse.id}</td>
                      <td className="px-4 py-4 font-medium text-white">{nurse.name}</td>
                      <td className="px-4 py-4 text-white/70">{nurse.age}</td>
                      <td className="px-4 py-4">
                        <Badge label={shiftBadge.label} variant={shiftBadge.variant} />
                      </td>
                      <td className="px-4 py-4">
                        <Badge label="24/7 · Shift-based" variant="gray" />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <LiquidGlassButton 
                          variant="danger" 
                          size="sm" 
                          onClick={() => handleRemove(nurse.id, nurse.name)}
                        >
                          Remove
                        </LiquidGlassButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </LiquidGlassCard>

      {/* Add Nurse Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Nurse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LiquidGlassInput label="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} icon={<UserPlus className="w-4 h-4" />} error={errors.name} placeholder="Nurse Joy" required />
          <LiquidGlassInput label="Age" type="number" min={18} max={70} value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} icon={<Hash className="w-4 h-4" />} error={errors.age} placeholder="28" required />
          <LiquidGlassInput label="Nurse ID" value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} icon={<Fingerprint className="w-4 h-4" />} placeholder="e.g. N301" error={errors.id} required />
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Shift</label>
            <select 
              className="liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer" 
              value={formData.shift} 
              onChange={e => setFormData({ ...formData, shift: e.target.value as NurseShift })}
            >
              <option className="bg-slate-900" value="Morning">Morning (6AM–2PM)</option>
              <option className="bg-slate-900" value="Evening">Evening (2PM–10PM)</option>
              <option className="bg-slate-900" value="Night">Night (10PM–6AM)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
          <LiquidGlassButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</LiquidGlassButton>
          <LiquidGlassButton variant="primary" onClick={handleAddNurse}>Add Nurse</LiquidGlassButton>
        </div>
      </Modal>
    </div>
  );
}