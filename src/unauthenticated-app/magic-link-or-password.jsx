import React from "react";
import { useAuth } from "../auth/auth-context";
import {
  UnauthenticatedAppErrorMessage,
  UnauthenticatedAppWrapper,
  UnauthenticatedAppCard,
  UnauthenticatedAppSubHeading,
  UnauthenticatedAppTopLeftCardButton,
} from "./shared/components";

export { MagicLinkOrPasswordView };

function MagicLinkOrPasswordView({ email, onBack, onMagicLink }) {
  const { signIn, resetPasswordForEmail } = useAuth();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };
  const onSignIn = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signIn({ email, password });
      if (error) {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleMagicLink = async () => {
    try {
      const { error } = await signIn({ email });
      if (error) {
        setError(error);
      } else {
        onMagicLink();
      }
    } catch (error) {
      setError(error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { error } = await resetPasswordForEmail(email);
      if (error) {
        setError(error);
      } else {
        onMagicLink();
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
        <UnauthenticatedAppSubHeading>Sign In</UnauthenticatedAppSubHeading>
        <p className="text-center font-semibold text-gray-800">{email}</p>

        <form className="space-y-3" onSubmit={onSignIn}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={password}
                onChange={onPasswordChanged}
              />
            </div>
          </div>
          {error ? <UnauthenticatedAppErrorMessage error={error} /> : null}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-center font-medium text-gray-900">
              Long password? Hard to type?
            </p>
            <p className="text-sm mt-2 mb-4 text-center font-medium text-gray-500">
              We can email you a magic link so you can sign in without having to
              type your password.
            </p>
            <button
              onClick={handleMagicLink}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-1"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
              Email Me A Link
            </button>
            <button
              onClick={handlePasswordReset}
              className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-1"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Let's Just Reset My Password
            </button>
          </div>
        </div>
      </UnauthenticatedAppCard>
    </UnauthenticatedAppWrapper>
  );
}
