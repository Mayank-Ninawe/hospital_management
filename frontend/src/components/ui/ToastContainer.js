import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useToast } from '../../hooks/useToast';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
export function ToastContainer() {
    const { toasts, dismissToast } = useToast();
    const icons = {
        success: _jsx(CheckCircle2, { className: "text-green-400 w-5 h-5 flex-shrink-0" }),
        error: _jsx(XCircle, { className: "text-red-400 w-5 h-5 flex-shrink-0" }),
        info: _jsx(Info, { className: "text-blue-400 w-5 h-5 flex-shrink-0" })
    };
    return (_jsx("div", { className: "fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none", children: toasts.map(toast => (_jsxs("div", { className: "pointer-events-auto liquid-glass rounded-xl px-4 py-3 flex items-start gap-3 min-w-64 max-w-80 shadow-lg translate-y-0 opacity-100 transition-all duration-300", children: [icons[toast.type], _jsx("div", { className: "flex-1 mt-0.5", children: _jsx("p", { className: "text-sm text-white", children: toast.message }) }), _jsx("button", { onClick: () => dismissToast(toast.id), className: "text-white/50 hover:text-white transition-colors cursor-pointer outline-none mt-0.5", children: _jsx(X, { className: "w-4 h-4" }) })] }, toast.id))) }));
}
