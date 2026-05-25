import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function LiquidGlassButton({ children, variant = 'primary', size = 'md', className = '', icon, ...props }) {
    const variants = {
        primary: "liquid-glass text-white hover:bg-white/10",
        ghost: "text-white/70 hover:text-white hover:bg-white/5",
        danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20"
    };
    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2 text-sm",
        lg: "px-8 py-3 text-base"
    };
    const baseClasses = "rounded-full font-medium transition-all flex items-center gap-2 border border-transparent"; // Add transparent border to offset button size visually sometimes
    return (_jsxs("button", { className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim(), ...props, children: [icon && _jsx("span", { children: icon }), children] }));
}
