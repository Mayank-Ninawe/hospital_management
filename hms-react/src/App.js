import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Nurses from './pages/Nurses';
import Appointments from './pages/Appointments';
import Rooms from './pages/Rooms';
import ActivityLogPage from './pages/ActivityLog';
import { useHMSStore } from './store/hmsStore';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(Layout, {}),
        children: [
            { index: true, element: _jsx(Dashboard, {}) },
            { path: 'patients', element: _jsx(Patients, {}) },
            { path: 'doctors', element: _jsx(Doctors, {}) },
            { path: 'nurses', element: _jsx(Nurses, {}) },
            { path: 'appointments', element: _jsx(Appointments, {}) },
            { path: 'rooms', element: _jsx(Rooms, {}) },
            { path: 'activity', element: _jsx(ActivityLogPage, {}) },
        ],
    },
]);
export default function App() {
    const fetchAllData = useHMSStore(state => state.fetchAllData);
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);
    return _jsx(RouterProvider, { router: router });
}
