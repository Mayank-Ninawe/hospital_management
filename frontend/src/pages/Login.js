import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
export default function Login() {
    const navigate = useNavigate();
    const { setToken, isAuthenticated } = useAuthStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    if (isAuthenticated()) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const targetUrl = import.meta.env.VITE_API_URL || '/api';
        try {
            const res = await fetch(`${targetUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) {
                throw new Error('Invalid credentials');
            }
            const data = await res.json();
            setToken(data.token);
            navigate('/');
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed';
            setError(message);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-950 p-4", children: _jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur", children: [_jsxs("div", { className: "mb-6 text-center", children: [_jsx("h1", { className: "text-3xl font-semibold text-white", children: "HMS" }), _jsx("p", { className: "mt-2 text-sm text-teal-400", children: "Login to continue" })] }), _jsxs("form", { onSubmit: handleLogin, className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-white/80", children: "Username" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Enter username", required: true, className: "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-teal-400" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-white/80", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter password", required: true, className: "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-teal-400" })] }), error ? _jsx("div", { className: "text-sm text-red-400", children: error }) : null, _jsx("button", { type: "submit", className: "mt-2 h-12 rounded-xl bg-teal-500 font-medium text-white transition hover:bg-teal-400", children: "Login" })] })] }) }));
}
