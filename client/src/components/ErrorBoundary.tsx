import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-base p-4">
          <div className="card max-w-md w-full text-center">
            <div className="w-16 h-16 bg-danger bg-opacity-10 text-danger rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">Si è verificato un problema</h2>
            <p className="text-muted mb-6">
              C'è stato un errore imprevisto in questa sezione dell'applicazione.
            </p>
            <button 
              className="btn btn-primary w-full justify-center"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={18} /> Ricarica la pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
