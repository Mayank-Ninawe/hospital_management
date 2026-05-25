import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useMemo, useState, useEffect } from 'react';
import { ToastContainer } from '../ui/ToastContainer';
export default function Layout() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);
    const currentPageTitle = useMemo(() => {
        switch (location.pathname) {
            case '/': return 'Dashboard';
            case '/patients': return 'Patients';
            case '/doctors': return 'Doctors';
            case '/nurses': return 'Nurses';
            case '/appointments': return 'Appointments';
            case '/rooms': return 'Rooms';
            case '/activity': return 'Activity Log';
            default: return 'MediCore HMS';
        }
    }, [location.pathname]);
    return (_jsxs("div", { className: "flex min-h-screen bg-[#0a0c12] relative", children: [_jsx("div", { className: "fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none -z-10 bg-[radial-gradient(circle,rgba(79,152,163,0.07)_0%,transparent_70%)]" }), _jsx("div", { className: "fixed inset-0 -z-10 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" }), isMobileMenuOpen && (_jsx("div", { className: "md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm", onClick: () => setIsMobileMenuOpen(false) })), _jsx("div", { className: `fixed inset-y-0 left-0 z-50 transform transition-transform duration-250 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`, children: _jsx(Sidebar, { className: "flex" }) }), _jsxs("div", { className: "flex-1 flex flex-col ml-0 w-full md:ml-[220px]", children: [_jsx(Topbar, { title: currentPageTitle, onMenuClick: () => setIsMobileMenuOpen(true) }), _jsx("main", { className: "flex-1 p-6 overflow-y-auto", children: _jsx("div", { className: "page-enter page-enter-active", children: _jsx(Outlet, {}) }, location.pathname) })] }), _jsx(ToastContainer, {})] }));
}
