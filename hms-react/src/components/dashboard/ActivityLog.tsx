import React from 'react';
import { ActivityLog as ActivityLogType } from '../../types';

export interface ActivityLogProps {
  logs: ActivityLogType[];
}

export function ActivityLog({ logs }: ActivityLogProps) {
  const recentLogs = logs.slice(0, 5);

  if (recentLogs.length === 0) {
    return null;
  }

  const colorMap: Record<string, string> = {
    teal: 'bg-teal-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    orange: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="flex flex-col gap-3">
      {recentLogs.map((log) => (
        <div key={log.id} className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${colorMap[log.color] || 'bg-white/40'} shadow-[0_0_8px_currentColor] opacity-80 flex-shrink-0`} />
          <div className="flex-1 text-sm text-white/80 line-clamp-1">
            {log.message}
          </div>
          <div className="text-xs text-white/30 tabular-nums whitespace-nowrap flex-shrink-0">
            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
    </div>
  );
}
