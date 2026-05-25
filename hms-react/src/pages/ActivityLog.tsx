import React, { useState } from 'react';
import { useHMSStore } from '../store/hmsStore';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { EmptyState } from '../components/ui/EmptyState';
import { Activity, Trash2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export default function ActivityLogPage() {
  const { activityLog, clearLog } = useHMSStore();
  const [filter, setFilter] = useState<'All' | 'patient' | 'doctor' | 'nurse' | 'appointment' | 'room' | 'system'>('All');

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the entire activity log? This cannot be undone.")) {
      clearLog();
    }
  };

  const categories = ['All', 'patient', 'doctor', 'nurse', 'appointment', 'room', 'system'] as const;

  const filteredLogs = filter === 'All' 
    ? activityLog 
    : activityLog.filter(log => log.category === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-display text-white">Activity Log</h1>
        {activityLog.length > 0 && (
          <LiquidGlassButton variant="ghost" size="sm" onClick={handleClear} icon={<Trash2 size={14} className="text-red-400" />}>
            <span className="text-red-400">Clear Log</span>
          </LiquidGlassButton>
        )}
      </div>

      <div className="flex gap-2 flex-wrap pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`liquid-glass rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors outline-none
              ${filter === cat ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}
            `}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filteredLogs.length === 0 ? (
        <EmptyState 
          icon={<Activity className="w-8 h-8" />} 
          message={filter === 'All' ? "No activity recorded" : `No activity recorded for category: ${filter}`} 
        />
      ) : (
        <LiquidGlassCard className="flex flex-col gap-0 p-0 overflow-hidden">
          {filteredLogs.map((entry, index) => (
            <div 
              key={entry.id || index} 
              className={`p-4 flex items-center gap-4 ${index !== filteredLogs.length - 1 ? 'border-b border-white/5' : ''} transition-all duration-150 hover:bg-white/[0.03] animate-[rowIn_200ms_ease]`}
            >
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: entry.color || '#9ca3af' }} 
              />
              <div className="text-sm text-white font-medium flex-1">
                {entry.message}
              </div>
              <Badge label={entry.category} variant="gray" className="hidden sm:inline-flex" />
              <div className="text-xs text-white/30 ml-auto whitespace-nowrap">
                {new Date(entry.timestamp).toLocaleString('en-US', { 
                  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' 
                })}
              </div>
            </div>
          ))}
        </LiquidGlassCard>
      )}
    </div>
  );
}