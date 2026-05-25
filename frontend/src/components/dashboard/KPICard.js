import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { useCountUp } from '../../hooks/useCountUp';
function AnimatedValue({ value }) {
    if (typeof value === 'number') {
        const count = useCountUp(value);
        return _jsx(_Fragment, { children: count });
    }
    if (typeof value === 'string' && value.includes('/')) {
        const [num, den] = value.split('/');
        const count = useCountUp(parseInt(num, 10) || 0);
        return _jsxs(_Fragment, { children: [count, "/", den] });
    }
    return _jsx(_Fragment, { children: value });
}
export function KPICard({ label, value, sub, accentColor }) {
    const colorMap = {
        teal: 'bg-teal-500',
        green: 'bg-green-500',
        amber: 'bg-amber-500',
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500'
    };
    return (_jsxs(LiquidGlassCard, { className: "p-5 flex flex-col justify-between h-full", children: [_jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-white/40", children: label }), _jsxs("div", { className: "mt-1 flex items-center gap-3", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${colorMap[accentColor]} shadow-[0_0_8px_currentColor] opacity-80` }), _jsx("div", { className: "text-3xl font-bold text-white font-mono tabular-nums leading-none", children: _jsx(AnimatedValue, { value: value }) })] }), sub && (_jsx("div", { className: "text-xs text-white/30 mt-1", children: sub }))] }));
}
