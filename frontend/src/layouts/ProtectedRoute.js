import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
export default function ProtectedRoute() {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated()) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(Outlet, {});
}
