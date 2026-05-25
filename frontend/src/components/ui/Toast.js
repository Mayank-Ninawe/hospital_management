import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
export function Toast({ message, type, onDismiss }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);
    const icons = {
        success: _jsx(CheckCircle2, { className: "text-green-400 w-5 h-5" }),
        error: _jsx(XCircle, { className: "text-red-400 w-5 h-5" }),
        info: _jsx(Info, { className: "text-blue-400 w-5 h-5" })
    };
    return (_jsxs("div", { className: "fixed bottom-6 right-6 z-[100] liquid-glass rounded-xl px-4 py-3 flex items-center justify-between gap-3 min-w-64 max-w-80 shadow-lg transition-all duration-300", children: [_jsxs("div", { className: "flex items-center gap-3", children: [icons[type], _jsx("p", { className: "text-sm text-white", children: message })] }), _jsx("button", { onClick: onDismiss, className: "text-white/50 hover:text-white transition-colors cursor-pointer outline-none", children: _jsx(X, { className: "w-4 h-4" }) })] }));
}
