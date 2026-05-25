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
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { useHMSStore } from './store/hmsStore';
import { useAuthStore } from './store/authStore';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: (
          <ErrorBoundary>
            <Layout />
          </ErrorBoundary>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'patients', element: <Patients /> },
          { path: 'doctors', element: <Doctors /> },
          { path: 'nurses', element: <Nurses /> },
          { path: 'appointments', element: <Appointments /> },
          { path: 'rooms', element: <Rooms /> },
          { path: 'activity', element: <ActivityLogPage /> },
        ],
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default function App() {
  const fetchAllData = useHMSStore(state => state.fetchAllData);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchAllData?.();
    }
  }, [fetchAllData, isAuthenticated]);

  return <RouterProvider router={router} />;
}
