export function ErrorFallback(message) {
  return function ({ error, resetErrorBoundary }) {
    return (
      <div className="rounded-md bg-red-50 p-4 m-3">
        <div className="flex">
          <div className="flex-shrink-0">
            {/* Heroicon name: solid/x-circle */}
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 space-y-2">
            <h3 className="text-sm font-medium text-red-800">{message}</h3>
            <p className="text-sm text-red-700">{error.message}</p>
            <button
              type="button"
              onClick={resetErrorBoundary}
              className="group inline-flex items-center px-2 py-1 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-gray-50 hover:border-red-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  };
}
