import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ActivityLog({ logs }) {
    const recentLogs = logs.slice(0, 5);
    if (recentLogs.length === 0) {
        return null;
    }
    const colorMap = {
        teal: 'bg-teal-500',
        green: 'bg-green-500',
        amber: 'bg-amber-500',
        orange: 'bg-amber-500',
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
    };
    return (_jsx("div", { className: "flex flex-col gap-3", children: recentLogs.map((log) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${colorMap[log.color] || 'bg-white/40'} shadow-[0_0_8px_currentColor] opacity-80 flex-shrink-0` }), _jsx("div", { className: "flex-1 text-sm text-white/80 line-clamp-1", children: log.message }), _jsx("div", { className: "text-xs text-white/30 tabular-nums whitespace-nowrap flex-shrink-0", children: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] }, log.id))) }));
}
