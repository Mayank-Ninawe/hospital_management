import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Heart, 
  CalendarDays, 
  DoorOpen, 
  Activity 
} from 'lucide-react';

export default function Sidebar({ className = 'hidden md:flex' }: { className?: string }) {
  return (
    <aside className={`fixed top-0 left-0 bg-black/40 backdrop-blur-xl border-r border-white/8 flex-col h-screen w-[220px] flex-shrink-0 z-40 ${className}`}>
      <div className="px-5 py-5 border-b border-white/8 flex items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 28 28" className="flex-shrink-0">
          <rect width="28" height="28" rx="8" fill="currentColor" opacity="0.12" className="text-teal-400"/>
          <path d="M14 7v14M7 14h14" stroke="#4f98a3" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white leading-tight">MediCore HMS</span>
          <span className="text-xs text-white/40 leading-tight">Hospital Management</span>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        <div className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-2 py-2 mt-2">
          Overview
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'text-teal-300 bg-teal-500/10 hover:bg-teal-500/15'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="absolute left-0 w-0.5 h-4 bg-teal-400 rounded-full animate-[scaleY_200ms_ease_forwards] origin-center" />}
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              Dashboard
            </>
          )}
        </NavLink>

        <div className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-2 py-2 mt-2">
          People
        </div>
        <NavLink
          to="/patients"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'text-teal-300 bg-teal-500/10 hover:bg-teal-500/15'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="absolute left-0 w-0.5 h-4 bg-teal-400 rounded-full animate-[scaleY_200ms_ease_forwards] origin-center" />}
              <Users className="w-4 h-4 flex-shrink-0" />
              Patients
            </>
          )}
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'text-teal-300 bg-teal-500/10 hover:bg-teal-500/15'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="absolute left-0 w-0.5 h-4 bg-teal-400 rounded-full animate-[scaleY_200ms_ease_forwards] origin-center" />}
              <Stethoscope className="w-4 h-4 flex-shrink-0" />
              Doctors
            </>
          )}
        </NavLink>
        <NavLink
          to="/nurses"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'text-teal-300 bg-teal-500/10 hover:bg-teal-500/15'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="absolute left-0 w-0.5 h-4 bg-teal-400 rounded-full animate-[scaleY_200ms_ease_forwards] origin-center" />}
              <Heart className="w-4 h-4 flex-shrink-0" />
              Nurses
            </>
          )}
        </NavLink>

        <div className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-2 py-2 mt-2">
          Operations
        </div>
        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'text-teal-300 bg-teal-500/10 hover:bg-teal-500/15'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="absolute left-0 w-0.5 h-4 bg-teal-400 rounded-full animate-[scaleY_200ms_ease_forwards] origin-center" />}
              <CalendarDays className="w-4 h-4 flex-shrink-0" />
              Appointments
            </>
          )}
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'text-teal-300 bg-teal-500/10 hover:bg-teal-500/15'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="absolute left-0 w-0.5 h-4 bg-teal-400 rounded-full animate-[scaleY_200ms_ease_forwards] origin-center" />}
              <DoorOpen className="w-4 h-4 flex-shrink-0" />
              Rooms
            </>
          )}
        </NavLink>

        <div className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-2 py-2 mt-2">
          Records
        </div>
        <NavLink
          to="/activity"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'text-teal-300 bg-teal-500/10 hover:bg-teal-500/15'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="absolute left-0 w-0.5 h-4 bg-teal-400 rounded-full animate-[scaleY_200ms_ease_forwards] origin-center" />}
              <Activity className="w-4 h-4 flex-shrink-0" />
              Activity Log
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}