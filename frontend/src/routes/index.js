import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Patients from '../pages/Patients';
import Doctors from '../pages/Doctors';
import Nurses from '../pages/Nurses';
import Rooms from '../pages/Rooms';
import Appointments from '../pages/Appointments';
import ActivityLog from '../pages/ActivityLog';
import Layout from '../layouts/Layout';
import ProtectedRoute from '../layouts/ProtectedRoute';
import NotFound from '../pages/NotFound';
export const AppRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { element: _jsx(ProtectedRoute, {}), children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/patients", element: _jsx(Patients, {}) }), _jsx(Route, { path: "/doctors", element: _jsx(Doctors, {}) }), _jsx(Route, { path: "/nurses", element: _jsx(Nurses, {}) }), _jsx(Route, { path: "/appointments", element: _jsx(Appointments, {}) }), _jsx(Route, { path: "/rooms", element: _jsx(Rooms, {}) }), _jsx(Route, { path: "/activity", element: _jsx(ActivityLog, {}) })] }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }));
};
