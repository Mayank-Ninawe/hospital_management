import React from 'react';

export interface BadgeProps {
  label: string;
  variant?: 'teal' | 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'gray';
  className?: string;
}

export function Badge({ label, variant, className = '' }: BadgeProps) {
  const variants = {
    teal: "bg-teal-500/15 text-teal-300",
    green: "bg-green-500/15 text-green-300",
    amber: "bg-amber-500/15 text-amber-300",
    red: "bg-red-500/15 text-red-300",
    blue: "bg-blue-500/15 text-blue-300",
    purple: "bg-purple-500/15 text-purple-300",
    gray: "bg-white/10 text-white/50"
  };

  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  return (
    <span className={`${baseClasses} ${variants[variant || 'gray']} ${className}`.trim()}>
      {label}
    </span>
  );
}
