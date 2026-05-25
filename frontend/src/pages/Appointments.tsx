import React, { useState } from 'react';
import { CalendarPlus, CalendarDays, CheckCircle2, XCircle } from 'lucide-react';
import { useHmsStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';
import { Appointment } from '../types';

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

    const patient = patients.find(p => p.id === formData.patientId);
    const doctor = doctors.find(d => d.id === formData.doctorId);
    const newAppointment: Appointment = {
      patientName: patient?.name || "Unknown",
      doctorName: doctor?.name || "Unknown",
      id: `A${Math.floor(Math.random() * 1000)}`,
      patientId: formData.patientId,
      doctorId: formData.doctorId,
      date: formData.date,
      time: formData.time,
      status: 'Scheduled',
    };

    bookAppointment(newAppointment);
    showToast('Appointment booked successfully', 'success');
    setIsModalOpen(false);
    setFormData({ patientId: '', doctorId: '', date: '', time: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'blue';
      case 'Completed': return 'green';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Appointments</h1>
        <LiquidGlassButton variant="primary" size="md" icon={<CalendarPlus size={14} />} onClick={() => setIsModalOpen(true)}>
          Book Appointment
        </LiquidGlassButton>
      </div>

      {appointments.length === 0 ? (
        <EmptyState 
          icon={<CalendarDays className="w-8 h-8" />} 
          message="No appointments scheduled" 
          action={{ label: 'Book Appointment', onClick: () => setIsModalOpen(true) }} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {appointments.map(apt => {
            const patient = patients.find(p => p.id === apt.patientId);
            const doctor = doctors.find(d => d.id === apt.doctorId);

            return (
              <LiquidGlassCard key={apt.id} className="p-5 flex flex-col h-full animate-[rowIn_200ms_ease]">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono font-bold text-white text-base">#{apt.id}</span>
                  <Badge label={apt.status} variant={getStatusColor(apt.status)} />
                </div>
                
                <div className="space-y-2 flex-1">
                  <div>
                    <span className="text-xs text-white/50 block">Date & Time</span>
                    <span className="text-sm text-white font-medium">{apt.date} at {apt.time}</span>
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Patient</span>
                    <span className="text-sm text-white">{patient?.name || apt.patientId}</span>
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Doctor</span>
                    <span className="text-sm text-white">{doctor?.name || apt.doctorId}</span>
                  </div>
                </div>

                {apt.status === 'Scheduled' && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                    <LiquidGlassButton 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        completeAppointment(apt.id);
                        showToast('Appointment completed', 'success');
                      }}
                      icon={<CheckCircle2 size={14} className="text-green-400" />}
                    >
                      Complete
                    </LiquidGlassButton>
                    <LiquidGlassButton 
                      variant="danger" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        cancelAppointment(apt.id);
                        showToast('Appointment cancelled', 'info');
                      }}
                      icon={<XCircle size={14} />}
                    >
                      Cancel
                    </LiquidGlassButton>
                  </div>
                )}
              </LiquidGlassCard>
            );
          })}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Appointment">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Patient</label>
            <select 
              className="liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5"
              value={formData.patientId}
              onChange={e => setFormData({ ...formData, patientId: e.target.value })}
            >
              <option className="bg-slate-900" value="">Select Patient</option>
              {patients.map(p => (
                <option className="bg-slate-900" key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Doctor</label>
            <select 
              className="liquid-glass rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer border border-white/5"
              value={formData.doctorId}
              onChange={e => setFormData({ ...formData, doctorId: e.target.value })}
            >
              <option className="bg-slate-900" value="">Select Doctor</option>
              {doctors.map(d => (
                <option className="bg-slate-900" key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Date</label>
            <input 
              type="date"
              className="liquid-glass w-full rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none border border-white/5"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-white/50">Time</label>
            <input 
              type="time"
              className="liquid-glass w-full rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none border border-white/5"
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
          <LiquidGlassButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</LiquidGlassButton>
          <LiquidGlassButton variant="primary" onClick={handleBook}>Book</LiquidGlassButton>
        </div>
      </Modal>
    </div>
  );
}