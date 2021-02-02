import {
  UnauthenticatedAppWrapper,
  UnauthenticatedAppCard,
  UnauthenticatedAppSubHeading,
} from "./shared/components";

export { EnterEmail };

function EnterEmail({ onContinue, onGotoSignUp, onEmailChanged, email }) {
  const handleContinue = (e) => {
    e.preventDefault();
    onContinue();
  };

  const handleGotoSignUp = (e) => {
    onGotoSignUp();
  };

  return (
    <UnauthenticatedAppWrapper>
      <UnauthenticatedAppCard>
        <UnauthenticatedAppSubHeading>Sign In</UnauthenticatedAppSubHeading>
        <form className="space-y-6" onSubmit={handleContinue}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={onEmailChanged}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                {/* Heroicon name: lock-closed */}
                <svg
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              Continue
            </button>
          </div>
        </form>
      </UnauthenticatedAppCard>

      <div className="flex flex-col items-center justify-center">
        <p className="mt-6 text-center text-xl font-bold text-gray-900">
          Don't have an account yet?
        </p>
        <button
          onClick={handleGotoSignUp}
          className="mt-3 py-2 px-4 border border-blue-600 font-medium rounded-md bg-gray-100 text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </div>
    </UnauthenticatedAppWrapper>
  );
}
