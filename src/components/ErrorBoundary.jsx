import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] grid place-items-center text-white p-6 text-center">
          <h2 className="text-xl font-semibold text-red-500">
            Something went wrong 
          </h2>
          <button
            className="mt-4 px-4 py-2 bg-accent text-white rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
