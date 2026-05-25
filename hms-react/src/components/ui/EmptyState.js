import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LiquidGlassButton } from './LiquidGlassButton';
export function EmptyState({ icon, message, action }) {
    return (_jsxs("div", { className: "flex flex-col items-center text-center py-16 gap-4 text-white/30", children: [_jsx("div", { className: "w-[80px] h-[80px] border border-white/8 rounded-full flex items-center justify-center animate-[pulse-ring_3s_ease-in-out_infinite]", children: _jsx("div", { className: "w-12 h-12 flex items-center justify-center opacity-70", children: icon }) }), _jsx("p", { className: "text-sm border-transparent", children: message }), action && (_jsx(LiquidGlassButton, { variant: "ghost", size: "sm", onClick: action.onClick, children: action.label }))] }));
}
