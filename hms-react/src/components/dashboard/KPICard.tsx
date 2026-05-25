import React from 'react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { useCountUp } from '../../hooks/useCountUp';

export interface KPICardProps {
  label: string;
  value: string | number;
  sub?: string;
  accentColor: 'teal' | 'green' | 'amber' | 'red' | 'blue' | 'purple';
}

function AnimatedValue({ value }: { value: string | number }) {
  if (typeof value === 'number') {
    const count = useCountUp(value);
    return <>{count}</>;
  }
  
  if (typeof value === 'string' && value.includes('/')) {
    const [num, den] = value.split('/');
    const count = useCountUp(parseInt(num, 10) || 0);
    return <>{count}/{den}</>;
  }
  
  return <>{value}</>;
}

export function KPICard({ label, value, sub, accentColor }: KPICardProps) {
  const colorMap = {
    teal: 'bg-teal-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500'
  };

  return (
    <LiquidGlassCard className="p-5 flex flex-col justify-between h-full">
      <div className="text-xs font-semibold uppercase tracking-wide text-white/40">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${colorMap[accentColor]} shadow-[0_0_8px_currentColor] opacity-80`} />
        <div className="text-3xl font-bold text-white font-mono tabular-nums leading-none">
          <AnimatedValue value={value} />
        </div>
      </div>
      {sub && (
        <div className="text-xs text-white/30 mt-1">
          {sub}
        </div>
      )}
    </LiquidGlassCard>
  );
}
