import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import ErrorBoundary from './layouts/ErrorBoundary';
import { ToastContainer } from './components/ui/ToastContainer';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
