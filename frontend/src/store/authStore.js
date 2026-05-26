import { create } from 'zustand';
export const useAuthStore = create((set, get) => ({
    token: null, // In-memory
    setToken: (token) => set({ token }),
    isAuthenticated: () => !!get().token,
    logout: () => set({ token: null })
}));
