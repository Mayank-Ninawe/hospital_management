import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-screen bg-gray-900 text-white", children: [_jsx("h1", { className: "text-6xl font-bold text-teal-500 mb-4", children: "404" }), _jsx("p", { className: "text-xl text-gray-300 mb-8", children: "Page not found" }), _jsx("button", { onClick: () => navigate('/'), className: "px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg shadow-md transition-colors", children: "Go to Dashboard" })] }));
};
export default NotFound;
