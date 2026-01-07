export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-[60vh] grid place-items-center text-white p-6 text-center">
      <div>
        <h1 className="text-xl font-semibold text-accent">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm opacity-80">
          {error.message || "An unexpected error occurred"}
        </p>

        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-accent text-white rounded hover:opacity-90 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
