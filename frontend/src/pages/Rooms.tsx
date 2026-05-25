import React, { useState, useEffect } from 'react';
import { DoorOpen, Plus, UserCircle, Hash } from 'lucide-react';
import { useHmsStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { Room } from '../types';

export default function Rooms() {
  const { rooms, patients, allocateRoom, vacateRoom, deleteRoom } = useHmsStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<{
    num: string;
    type: 'ICU' | 'Emergency' | 'General';
    patientId: string;
    status: 'vacant' | 'occupied' | 'maintenance';
  }>({
    num: '',
    type: 'General',
    patientId: '',
    status: 'vacant'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-set status to occupied if a patient is selected
  useEffect(() => {
    if (formData.patientId && formData.status !== 'occupied') {
      setFormData(prev => ({ ...prev, status: 'occupied' }));
    } else if (!formData.patientId && formData.status === 'occupied') {
      setFormData(prev => ({ ...prev, status: 'vacant' }));
    }
  }, [formData.patientId]);

  const totalCount = rooms.length;
  const occupiedCount = rooms.filter(r => r.status === 'occupied').length;
  const vacantCount = rooms.filter(r => r.status === 'vacant').length;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.num) {
      newErrors.num = 'Room number is required';
    } else if (isNaN(Number(formData.num)) || Number(formData.num) < 1) {
      newErrors.num = 'Valid positive room number required';
    } else if (rooms.some(r => r.num === Number(formData.num))) {
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
      } as Room;

      allocateRoom(newRoom);
      showToast(`Room #${roomNum} allocated successfully`, 'success');
      setIsModalOpen(false);
      setFormData({ num: '', type: 'General', patientId: '', status: 'vacant' });
      setErrors({});
    }
  };

  const handleDelete = (num: number) => {
    if (window.confirm(`Are you sure you want to delete Room #${num}?`)) {
      deleteRoom(num);
      showToast(`Room #${num} removed`, 'info');
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'ICU': return 'red';
      case 'Emergency': return 'amber';
      case 'General': return 'blue';
      default: return 'gray';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ICU': return 'Intensive Care Unit';
      case 'Emergency': return 'Emergency Room';
      case 'General': return 'General Ward';
      default: return type;
    }
  };

  // Patients who are admitted and not already in a room
  const availablePatients = patients.filter(p => p.status === 'admitted' && !rooms.some(r => r.patientId === p.id));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Rooms</h1>
        <LiquidGlassButton variant="primary" size="md" icon={<Plus size={14} />} onClick={() => setIsModalOpen(true)}>
          Allocate Room
        </LiquidGlassButton>
      </div>

      {/* Summary Row */}
      <div className="flex items-center gap-3 mt-4 mb-6">
        <div className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/60">
          <span className="text-white font-bold mr-1">{totalCount}</span> Total Rooms
        </div>
        <div className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/60">
          <span className="text-green-400 font-bold mr-1">{occupiedCount}</span> Occupied
        </div>
        <div className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/60">
          <span className="text-white/40 font-bold mr-1">{vacantCount}</span> Vacant
        </div>
      </div>

      {/* Room Cards Grid */}
      {rooms.length === 0 ? (
        <EmptyState icon={<DoorOpen className="w-8 h-8" />} message="No rooms allocated" action={{ label: 'Allocate Room', onClick: () => setIsModalOpen(true) }} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.map(room => (
            <LiquidGlassCard key={room.num} className="p-5 flex flex-col h-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono font-bold text-white text-base">Room #{room.num}</div>
                  <div className="text-xs text-white/30 mt-1">{getTypeLabel(room.type)}</div>
                </div>
                <Badge label={room.type} variant={getTypeVariant(room.type)} />
              </div>

              <div className="mt-4 flex-1">
                {room.status === 'occupied' && room.patientName ? (
                  <div className="flex items-start gap-2">
                    <UserCircle className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-white">{room.patientName}</div>
                      <div className="text-xs text-white/30 mt-0.5">
                        {room.allocatedAt ? new Date(room.allocatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-white/25 italic">Unoccupied</div>
                )}
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${room.status === 'occupied' ? 'bg-green-400' : room.status === 'maintenance' ? 'bg-amber-400' : 'bg-white/20'}`} />
                <span className="text-xs text-white/50 capitalize">{room.status}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                {room.status === 'occupied' && (
                  <LiquidGlassButton variant="ghost" size="sm" onClick={() => vacateRoom(room.num)} className="flex-1">
                    Vacate
                  </LiquidGlassButton>
                )}
                <LiquidGlassButton variant="danger" size="sm" onClick={() => handleDelete(room.num)} className="flex-1">
                  Remove
                </LiquidGlassButton>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      )}

      {/* Allocate Room Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Allocate Room">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Room Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/30">
                <Hash size={16} />
              </div>
              <input 
                type="number"
                min="1"
                className={`liquid-glass w-full rounded-xl pl-10 pr-4 py-2.5 bg-transparent text-white text-sm outline-none border ${errors.num ? 'border-red-500/50' : 'border-white/5'}`}
                placeholder="e.g. 101"
                value={formData.num}
                onChange={e => setFormData({ ...formData, num: e.target.value })}
              />
            </div>
            {errors.num && <span className="text-red-400 text-xs">{errors.num}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Room Type</label>
            <select 
              className="liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value as any })}
            >
              <option className="bg-slate-900" value="General">General Ward</option>
              <option className="bg-slate-900" value="ICU">Intensive Care Unit</option>
              <option className="bg-slate-900" value="Emergency">Emergency Room</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Assign Patient (Optional)</label>
            <select 
              className="liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5"
              value={formData.patientId}
              onChange={e => setFormData({ ...formData, patientId: e.target.value })}
            >
              <option className="bg-slate-900" value="">— Leave Unoccupied —</option>
              {availablePatients.map(p => (
                <option className="bg-slate-900" key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Status</label>
            <select 
              className="liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5 opacity-80"
              value={formData.status}
              disabled={!!formData.patientId}
              onChange={e => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option className="bg-slate-900" value="vacant">Vacant</option>
              {formData.patientId && <option className="bg-slate-900" value="occupied">Occupied</option>}
              {!formData.patientId && <option className="bg-slate-900" value="maintenance">Maintenance</option>}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
          <LiquidGlassButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</LiquidGlassButton>
          <LiquidGlassButton variant="primary" onClick={handleAllocate}>
            Allocate Room
          </LiquidGlassButton>
        </div>
      </Modal>
    </div>
  );
}