import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useToast } from '../../hooks/useToast';

interface Props {
  children?: ReactNode;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryInner extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.showToast('An unexpected error occurred', 'error');
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 focus:outline-none px-4">
          <div className="max-w-xl w-full bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 text-center">
            <h2 className="text-3xl font-bold text-red-400 mb-4">Something went wrong</h2>
            <div className="bg-gray-900 border border-gray-700 rounded p-4 mb-8 text-left overflow-auto max-h-48">
              <code className="text-gray-300 text-sm">{this.state.error?.message}</code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg shadow-md transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  return <ErrorBoundaryInner showToast={showToast}>{children}</ErrorBoundaryInner>;
};

export default ErrorBoundary;
