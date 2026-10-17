import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#0A1931] flex items-center justify-center p-6 selection:bg-[#A51C30] selection:text-white">
          <div className="max-w-md w-full bg-white border border-[#0A1931]/15 rounded-2xl shadow-xl p-8 text-center space-y-6">
            <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-[#A51C30]">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A51C30]">
                University of Central Punjab
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1931]">
                Application Experience Notice
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                A temporary display hiccup occurred while rendering this view. Please refresh to restore the campus portal.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-left text-xs font-mono text-slate-600 max-h-24 overflow-y-auto">
                {this.state.error.message}
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="w-full py-3 px-4 bg-[#0A1931] hover:bg-[#A51C30] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
