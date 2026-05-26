import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import ErrorBoundary from './layouts/ErrorBoundary';
import { ToastContainer } from './components/ui/ToastContainer';
function App() {
    return (_jsx(ErrorBoundary, { children: _jsxs(BrowserRouter, { children: [_jsx(AppRoutes, {}), _jsx(ToastContainer, {})] }) }));
}
export default App;
