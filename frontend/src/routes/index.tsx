import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Patients from '../pages/Patients';
import Layout from '../layouts/Layout';
import ProtectedRoute from '../layouts/ProtectedRoute';
import NotFound from '../pages/NotFound'; // Create a simple 404 page

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        {/* Add Doctor, Nurse, Room routes here similarly */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
