import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LiquidGlassCard } from './ui/LiquidGlassCard';
import { LiquidGlassButton } from './ui/LiquidGlassButton';
import { LiquidGlassInput } from './ui/LiquidGlassInput';

export default function Login() {
  const navigate = useNavigate();
  const { setToken, isAuthenticated } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const targetUrl = import.meta.env.VITE_API_URL || '/api';
    
    try {
      const res = await fetch(`${targetUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      setToken(data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display text-white tracking-wide">HMS</h1>
          <p className="text-teal-400 mt-2">Login to Continue</p>
        </div>

        <LiquidGlassCard className="p-6 sm:p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <LiquidGlassInput 
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <LiquidGlassInput 
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />

            {error && <div className="text-red-400 text-sm mt-1">{error}</div>}

            <LiquidGlassButton variant="primary" type="submit" className="mt-2 text-base h-12 w-full justify-center">
              Login
            </LiquidGlassButton>
          </form>
        </LiquidGlassCard>
      </div>
    </div>
  );
}