export function UnauthenticatedAppWrapper({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-200 via-gray-50 to-yellow-300">
      <div className="fixed top-14 sm:top-1/4 max-w-md w-full space-y-4">
        <UnauthenticatedAppHeader />
        {children}
      </div>
    </div>
  );
}

function UnauthenticatedAppHeader() {
  return (
    <div className="flex items-center justify-center space-x-3">
      {/* 48 == h-12 */}
      <img
        width={48}
        height={48}
        className="h-12"
        src="favicon.svg"
        alt="Workflow"
      />
      {/* <span className="text-3xl">🌊</span> */}
      <h1 className="text-center text-3xl font-extrabold text-gray-900">
        The Flow
      </h1>
    </div>
  );
}

export function UnauthenticatedAppCard({ children }) {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="relative bg-white py-8 px-4 shadow rounded-lg sm:px-10">
        {children}
      </div>
    </div>
  );
}

export function UnauthenticatedAppSubHeading({ children }) {
  return (
    <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-2">
      {children}
    </h2>
  );
}

export function UnauthenticatedAppTopLeftCardButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 left-2 py-1 px-2 border border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-gray-500 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}

export function UnauthenticatedAppErrorMessage({ error }) {
  return (
    <div className="rounded-md bg-red-50 p-4 max-w-md w-full">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {/* Heroicon name: x-circle */}
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
        <div className="ml-3">
          {/* <h3 className="text-sm font-medium text-red-800">
            There was an error:
          </h3> */}
          <div className="text-sm text-red-700">
            <p>{error.message}</p>
            {/* <ul className="list-disc pl-5 space-y-1">
                <li>Your password must be at least 8 characters</li>
                <li>
                  Your password must include at least one pro wrestling
                  finishing move
                </li>
              </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}
