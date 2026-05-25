import React from 'react';
import { Users, CalendarDays, Activity } from 'lucide-react';
import { useHMSStore } from '../store/hmsStore';
import { KPICard } from '../components/dashboard/KPICard';
import { ActivityLog } from '../components/dashboard/ActivityLog';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { PatientStatus } from '../types';

export default function Dashboard() {
  const { patients, doctors, nurses, rooms, appointments, activityLog } = useHMSStore();

  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const scheduledAppointments = appointments.filter(a => a.status === 'Scheduled').length;

  const recentPatients = [...patients].reverse().slice(0, 5);
  const upcomingAppointments = [...appointments].filter(a => a.status === 'Scheduled').slice(0, 5);

  const getStatusVariant = (status: PatientStatus) => {
    switch (status) {
      case 'admitted': return 'teal';
      case 'discharged': return 'gray';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard 
          label="Total Patients" 
          value={patients.length} 
          accentColor="teal" 
        />
        <KPICard 
          label="Doctors on Staff" 
          value={doctors.length} 
          accentColor="blue" 
        />
        <KPICard 
          label="Nurses" 
          value={nurses.length} 
          accentColor="purple" 
        />
        <KPICard 
          label="Rooms Occupied" 
          value={`${occupiedRooms}/${rooms.length}`} 
          accentColor="amber" 
        />
        <KPICard 
          label="Appointments" 
          value={scheduledAppointments} 
          accentColor="green" 
          sub="Scheduled"
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left card "Recent Patients" */}
        <LiquidGlassCard className="rounded-2xl flex flex-col p-0 overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h2 className="font-display text-base font-semibold text-white">
              Recent Patients
            </h2>
          </div>
          <div className="flex-1 p-4 flex flex-col">
            {recentPatients.length === 0 ? (
              <EmptyState icon={<Users className="w-8 h-8" />} message="No recent patients." />
            ) : (
              <div className="flex flex-col">
                {recentPatients.map((patient, idx) => (
                  <div key={patient.id} className={`flex items-center gap-4 py-3 ${idx !== recentPatients.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-white">{patient.name}</div>
                      <div className="text-xs text-white/40">ID: {patient.id} • Age: {patient.age}</div>
                    </div>
                    <Badge label={patient.status} variant={getStatusVariant(patient.status)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </LiquidGlassCard>

        {/* Right card "Upcoming Appointments" */}
        <LiquidGlassCard className="rounded-2xl flex flex-col p-0 overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h2 className="font-display text-base font-semibold text-white">
              Upcoming Appointments
            </h2>
          </div>
          <div className="flex-1 p-4 flex flex-col">
            {upcomingAppointments.length === 0 ? (
              <EmptyState icon={<CalendarDays className="w-8 h-8" />} message="No upcoming appointments." />
            ) : (
              <div className="flex flex-col">
                {upcomingAppointments.map((apt, idx) => (
                  <div key={apt.id} className={`flex items-center gap-4 py-3 ${idx !== upcomingAppointments.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-white">{apt.patientName}</div>
                      <div className="text-xs text-white/40">{apt.doctorName} • {new Date(apt.date).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </LiquidGlassCard>
      </div>

      {/* Activity Ticker (bottom) */}
      <LiquidGlassCard className="p-5 rounded-2xl">
        <h2 className="font-display text-base font-semibold text-white flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-blue-400" />
          Recent Activity
        </h2>
        <ActivityLog logs={activityLog} />
      </LiquidGlassCard>
    </div>
  );
}
