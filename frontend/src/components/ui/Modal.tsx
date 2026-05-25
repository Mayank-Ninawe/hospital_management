import React from 'react';
import { X } from 'lucide-react';
import { LiquidGlassButton } from './LiquidGlassButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`liquid-glass rounded-2xl w-full ${maxWidth} max-h-[90dvh] overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-4'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <h2 className="text-base font-semibold text-white font-display">{title}</h2>
          <LiquidGlassButton variant="ghost" size="sm" onClick={onClose} icon={<X className="w-4 h-4" />} />
        </div>
        <div className="p-5 flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
