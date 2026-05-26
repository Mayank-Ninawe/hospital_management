import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useHmsStore } from "../store/hmsStore";
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';
import { EmptyState } from '../components/ui/EmptyState';
import { Activity, Trash2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
export default function ActivityLogPage() {
    const { activityLog, clearLog } = useHmsStore();
    const [filter, setFilter] = useState('All');
    const handleClear = () => {
        if (window.confirm("Are you sure you want to clear the entire activity log? This cannot be undone.")) {
            clearLog();
        }
    };
    const categories = ['All', 'patient', 'doctor', 'nurse', 'appointment', 'room', 'system'];
    const filteredLogs = filter === 'All'
        ? activityLog
        : activityLog.filter((log) => log.category === filter);
    return (_jsxs("div", { className: "max-w-5xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsx("h1", { className: "text-3xl font-display text-white", children: "Activity Log" }), activityLog.length > 0 && (_jsx(LiquidGlassButton, { variant: "ghost", size: "sm", onClick: handleClear, icon: _jsx(Trash2, { size: 14, className: "text-red-400" }), children: _jsx("span", { className: "text-red-400", children: "Clear Log" }) }))] }), _jsx("div", { className: "flex gap-2 flex-wrap pb-2", children: categories.map(cat => (_jsx("button", { onClick: () => setFilter(cat), className: `liquid-glass rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors outline-none
              ${filter === cat ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}
            `, children: cat.charAt(0).toUpperCase() + cat.slice(1) }, cat))) }), filteredLogs.length === 0 ? (_jsx(EmptyState, { icon: _jsx(Activity, { className: "w-8 h-8" }), message: filter === 'All' ? "No activity recorded" : `No activity recorded for category: ${filter}` })) : (_jsx(LiquidGlassCard, { className: "flex flex-col gap-0 p-0 overflow-hidden", children: filteredLogs.map((entry, index) => (_jsxs("div", { className: `p-4 flex items-center gap-4 ${index !== filteredLogs.length - 1 ? 'border-b border-white/5' : ''} transition-all duration-150 hover:bg-white/[0.03] animate-[rowIn_200ms_ease]`, children: [_jsx("div", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { backgroundColor: entry.color || '#9ca3af' } }), _jsx("div", { className: "text-sm text-white font-medium flex-1", children: entry.message }), _jsx(Badge, { label: entry.category, variant: "gray", className: "hidden sm:inline-flex" }), _jsx("div", { className: "text-xs text-white/30 ml-auto whitespace-nowrap", children: new Date(entry.timestamp).toLocaleString('en-US', {
                                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit'
                            }) })] }, entry.id || index))) }))] }));
}
