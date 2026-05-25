import { useState, useCallback, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let memoryToasts: ToastMessage[] = [];
let listeners: Array<() => void> = [];

const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>(memoryToasts);

  useEffect(() => {
    const listener = () => setToasts([...memoryToasts]);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const dismissToast = useCallback((id: string) => {
    memoryToasts = memoryToasts.filter(t => t.id !== id);
    emitChange();
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
    memoryToasts = [...memoryToasts, { id, message, type }];
    emitChange();

    setTimeout(() => {
      dismissToast(id);
    }, 3000);
  }, [dismissToast]);

  return { toasts, showToast, dismissToast };
}
