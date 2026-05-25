import React from 'react';

export interface LiquidGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export function LiquidGlassButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  ...props
}: LiquidGlassButtonProps) {
  const variants = {
    primary: "liquid-glass text-white hover:bg-white/10",
    ghost: "text-white/70 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2 text-sm",
    lg: "px-8 py-3 text-base"
  };

  const baseClasses = "rounded-full font-medium transition-all flex items-center gap-2 border border-transparent"; // Add transparent border to offset button size visually sometimes

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
