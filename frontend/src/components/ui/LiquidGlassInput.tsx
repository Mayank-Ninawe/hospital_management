import React from 'react';

export interface LiquidGlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function LiquidGlassInput({
  label,
  error,
  icon,
  className = '',
  ...props
}: LiquidGlassInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`.trim()}>
      {label && <label className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</label>}
      <div className={`liquid-glass rounded-full pl-5 pr-4 py-2.5 flex items-center gap-3 border ${error ? 'border-red-500/50' : 'border-white/5'}`}>
        {icon && <span className="text-white/40 flex items-center justify-center w-4 h-4">{icon}</span>}
        <input
          {...props}
          className="bg-transparent outline-none text-white placeholder:text-white/30 text-sm flex-1"
        />
      </div>
      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
}
