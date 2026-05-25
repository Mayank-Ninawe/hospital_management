import React from 'react';

export interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function LiquidGlassCard({ children, className = '', onClick, hoverable = false }: LiquidGlassCardProps) {
  const baseClasses = "liquid-glass rounded-2xl";
  const hoverClasses = hoverable ? "hover:bg-white/5 transition-all cursor-pointer" : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`.trim()} onClick={onClick}>
      {children}
    </div>
  );
}
