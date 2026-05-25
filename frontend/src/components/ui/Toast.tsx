import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onDismiss: () => void;
}

export function Toast({ message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: <CheckCircle2 className="text-green-400 w-5 h-5" />,
    error: <XCircle className="text-red-400 w-5 h-5" />,
    info: <Info className="text-blue-400 w-5 h-5" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] liquid-glass rounded-xl px-4 py-3 flex items-center justify-between gap-3 min-w-64 max-w-80 shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3">
        {icons[type]}
        <p className="text-sm text-white">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-white/50 hover:text-white transition-colors cursor-pointer outline-none">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
