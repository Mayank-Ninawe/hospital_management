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
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/nurses" element={<Nurses />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/activity" element={<ActivityLog />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
