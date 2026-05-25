import React, { useState } from 'react';
import { UserPlus, Users, Hash, Fingerprint } from 'lucide-react';
import { useHMSStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { LiquidGlassInput } from '../components/ui/LiquidGlassInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { PatientStatus, Patient } from '../types';

export default function Patients() {
  const { patients, doctors, addPatient, dischargePatient } = useHMSStore();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    assignedDoctorId: '',
    status: 'admitted' as PatientStatus
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!formData.id.trim()) {
      newErrors.id = 'Patient ID is required';
    } else if (patients.some(p => p.id === formData.id)) {
      newErrors.id = 'Patient ID must be unique';
    }

    const ageNum = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(ageNum) || ageNum < 0 || ageNum > 130) {
      newErrors.age = 'Age must be between 0 and 130';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPatient = () => {
    if (validate()) {
      const newPatient: Patient = {
        id: Number(formData.id),
        name: formData.name,
        age: parseInt(formData.age),
        status: formData.status as PatientStatus,
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

  const handleDischarge = (id: number, name: string) => {
    dischargePatient(id);
    showToast(`Patient ${name} discharged.`, 'info');
  };

  const getStatusVariant = (status: PatientStatus) => {
    switch (status) {
      case 'admitted': return 'green';
      case 'discharged': return 'gray';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      

      {/* View header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-white">Patients</h1>
        <LiquidGlassButton 
          variant="primary" 
          size="md" 
          icon={<UserPlus size={14} />} 
          onClick={() => setIsModalOpen(true)}
        >
          Add Patient
        </LiquidGlassButton>
      </div>

      
      <div className="mb-4">
        <LiquidGlassInput 
          placeholder="Search by name..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* Patient Table */}
      <LiquidGlassCard className="p-0 overflow-hidden">
        {patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
          <EmptyState 
            icon={<Users className="w-8 h-8" />} 
            message="No patients admitted" 
            action={{ label: "Add Patient", onClick: () => setIsModalOpen(true) }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[11px] uppercase tracking-wider text-white/40">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Age</th>
                  <th className="px-4 py-3 font-medium">Assigned Doctor</th>
                  <th className="px-4 py-3 font-medium">Room</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(patient => {
                  const assignedDoc = doctors.find(d => d.id === patient.assignedDoctorId);
                  
                  return (
                    <tr key={patient.id} className="border-b border-white/5 text-sm text-white group transition-all duration-150 hover:bg-white/[0.03] animate-[rowIn_200ms_ease]">
                      <td className="px-4 py-4 font-mono text-xs text-white/40">{patient.id}</td>
                      <td className="px-4 py-4 font-medium text-white">{patient.name}</td>
                      <td className="px-4 py-4 text-white/70">{patient.age}</td>
                      <td className="px-4 py-4 text-white/70">
                        {assignedDoc ? assignedDoc.name : '—'}
                      </td>
                      <td className="px-4 py-4 text-white/70">
                        {patient.assignedRoomId ?? '—'}
                      </td>
                      <td className="px-4 py-4">
                        <Badge label={patient.status} variant={getStatusVariant(patient.status)} />
                      </td>
                      <td className="px-4 py-4 text-right flex justify-end">
                        <LiquidGlassButton 
                          variant="danger" 
                          size="sm" 
                          disabled={patient.status === 'discharged'}
                          onClick={() => handleDischarge(patient.id, patient.name)}
                        >
                          Discharge
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

      {/* Add Patient Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add Patient"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LiquidGlassInput 
            label="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            icon={<UserPlus className="w-4 h-4" />}
            error={errors.name}
            placeholder="John Doe"
            required
          />
          <LiquidGlassInput 
            label="Age" 
            type="number"
            min={0}
            max={130}
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            icon={<Hash className="w-4 h-4" />}
            error={errors.age}
            placeholder="30"
            required
          />
          <LiquidGlassInput 
            label="Patient ID" 
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            icon={<Fingerprint className="w-4 h-4" />}
            placeholder="e.g. P201"
            error={errors.id}
            required
          />
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Assigned Doctor</label>
            <select 
              className="liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer"
              value={formData.assignedDoctorId}
              onChange={(e) => setFormData({ ...formData, assignedDoctorId: e.target.value })}
            >
              <option className="bg-slate-900" value="">— Unassigned —</option>
              {doctors.map(doc => (
                <option className="bg-slate-900" key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Status</label>
            <select 
              className="liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as PatientStatus })}
            >
              <option className="bg-slate-900" value="admitted">Admitted</option>
              <option className="bg-slate-900" value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
          <LiquidGlassButton variant="ghost" onClick={() => setIsModalOpen(false)}>
            Cancel
          </LiquidGlassButton>
          <LiquidGlassButton variant="primary" onClick={handleAddPatient}>
            Add Patient
          </LiquidGlassButton>
        </div>
      </Modal>
    </div>
  );
}