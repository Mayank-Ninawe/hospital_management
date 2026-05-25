import React from 'react';
import { LiquidGlassButton } from './LiquidGlassButton';

export interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 gap-4 text-white/30">
      <div className="w-[80px] h-[80px] border border-white/8 rounded-full flex items-center justify-center animate-[pulse-ring_3s_ease-in-out_infinite]">
        <div className="w-12 h-12 flex items-center justify-center opacity-70">
          {icon}
        </div>
      </div>
      <p className="text-sm border-transparent">{message}</p>
      {action && (
        <LiquidGlassButton variant="ghost" size="sm" onClick={action.onClick}>
          {action.label}
        </LiquidGlassButton>
      )}
    </div>
  );
}
