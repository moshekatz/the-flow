import React from "react";
import { useAuth } from "../auth/auth-context";
import {
  UnauthenticatedAppErrorMessage,
  UnauthenticatedAppWrapper,
  UnauthenticatedAppCard,
  UnauthenticatedAppSubHeading,
  UnauthenticatedAppTopLeftCardButton,
} from "./shared/components";

export { SignUp };

function SignUp({ onBack, onSignUp, onEmailChanged, email }) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const { signUp } = useAuth();

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signUp({ email, password });
      if (error) {
        setError(error);
      } else {
        onSignUp();
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <UnauthenticatedAppWrapper>
      <UnauthenticatedAppCard>
        <UnauthenticatedAppTopLeftCardButton onClick={onBack}>
          Back
        </UnauthenticatedAppTopLeftCardButton>
        <UnauthenticatedAppSubHeading>Sign Up</UnauthenticatedAppSubHeading>
        <form className="space-y-6" onSubmit={handleSignUp}>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={onEmailChanged}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={onPasswordChanged}
              />
            </div>
          </div>
          {error ? <UnauthenticatedAppErrorMessage error={error} /> : null}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* TODO: different icon? -> Heroicon name: lock-closed */}
                <svg
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </UnauthenticatedAppCard>
    </UnauthenticatedAppWrapper>
  );
}
