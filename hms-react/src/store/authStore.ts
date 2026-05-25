import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null, // In-memory
  setToken: (token) => set({ token }),
  isAuthenticated: () => !!get().token,
  logout: () => set({ token: null })
}));
