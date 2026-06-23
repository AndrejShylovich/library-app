import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const fallbackStyles: React.CSSProperties = {
  padding: "2rem",
  textAlign: "center",
  border: "1px solid red",
};

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => this.setState({ hasError: false, error: undefined });

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (!hasError) return children;

    return (
      fallback ?? (
        <div style={fallbackStyles} role="alert" aria-live="assertive">
          <h2>Something went wrong</h2>
          <p>Please refresh the page or try again later.</p>
          <button onClick={this.resetError}>Try again</button>
          <button onClick={() => window.location.reload()}>Refresh page</button>
        </div>
      )
    );
  }
}

export default ErrorBoundary;
