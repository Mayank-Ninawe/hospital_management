import { jsx as _jsx } from "react/jsx-runtime";
export function LiquidGlassCard({ children, className = '', onClick, hoverable = false }) {
    const baseClasses = "liquid-glass rounded-2xl";
    const hoverClasses = hoverable ? "hover:bg-white/5 transition-all cursor-pointer" : "";
    return (_jsx("div", { className: `${baseClasses} ${hoverClasses} ${className}`.trim(), onClick: onClick, children: children }));
}
