import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { useToast } from '../hooks/useToast';
class ErrorBoundaryInner extends Component {
    state = {
        hasError: false
    };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.props.showToast('An unexpected error occurred', 'error');
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "flex flex-col items-center justify-center h-screen bg-gray-900 focus:outline-none px-4", children: _jsxs("div", { className: "max-w-xl w-full bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-red-400 mb-4", children: "Something went wrong" }), _jsx("div", { className: "bg-gray-900 border border-gray-700 rounded p-4 mb-8 text-left overflow-auto max-h-48", children: _jsx("code", { className: "text-gray-300 text-sm", children: this.state.error?.message }) }), _jsx("button", { onClick: () => window.location.reload(), className: "px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg shadow-md transition-colors", children: "Reload Page" })] }) }));
        }
        return this.props.children;
    }
}
const ErrorBoundary = ({ children }) => {
    const { showToast } = useToast();
    return _jsx(ErrorBoundaryInner, { showToast: showToast, children: children });
};
export default ErrorBoundary;
