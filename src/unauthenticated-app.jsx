import React from "react";
import { useAuth } from "./auth-context";
import {
  ErrorMessage,
  UnauthenticatedAppWrapper,
  UnauthenticatedAppCard,
  UnauthenticatedAppSubHeading,
  UnauthenticatedAppTopLeftCardButton,
} from "./components";

export default UnauthenticatedApp;

const workflowState = {
  email: "SIGN_IN_EMAIL",
  magicLinkOrPassword: "SIGN_IN_MAGIC_LINK_OR_PASSWORD",
  SignUp: "SIGN_UP",
  // forgotMyPassword: "FORGOT_PASSWORD",
  emailSent: "EMAIL_SENT",
};

function UnauthenticatedApp() {
  const [workflow, setWorkflow] = React.useState(workflowState.email);
  const [email, setEmail] = React.useState("");

  switch (workflow) {
    case workflowState.email: {
      return (
        <SignInEmailView
          onContinue={() => {
            setWorkflow(workflowState.magicLinkOrPassword);
          }}
          onGotoSignUp={() => {
            setWorkflow(workflowState.SignUp);
          }}
          onEmailChanged={(e) => setEmail(e.target.value)}
          email={email}
        />
      );
    }
    case workflowState.magicLinkOrPassword: {
      return (
        <MagicLinkOrPasswordView
          email={email}
          onBack={() => {
            setWorkflow(workflowState.email);
          }}
          onMagicLink={() => {
            setWorkflow(workflowState.emailSent);
          }}
        />
      );
    }
    case workflowState.SignUp: {
      return (
        <SignUp
          onEmailChanged={(e) => setEmail(e.target.value)}
          email={email}
          onBack={() => {
            setWorkflow(workflowState.email);
          }}
          onSignUp={() => {
            setWorkflow(workflowState.emailSent);
          }}
        />
      );
    }
    case workflowState.emailSent: {
      return <EmailSent email={email} />;
    }
    default: {
      throw new Error(
        `Unsupported workflow step of type ${workflow} on <UnauthenticatedApp/>.`
      );
    }
  }
}

function SignInEmailView({ onContinue, onGotoSignUp, onEmailChanged, email }) {
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

function MagicLinkOrPasswordView({ email, onBack, onMagicLink }) {
  const { login, resetPasswordForEmail } = useAuth();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };
  const onSignIn = async (e) => {
    e.preventDefault();
    try {
      const { error } = await login({ email, password });
      if (error) {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleMagicLink = async () => {
    try {
      const { error } = await login({ email });
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
          {error ? <ErrorMessage error={error} /> : null}
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
                  fill-rule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clip-rule="evenodd"
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

function SignUp({ onBack, onSignUp, onEmailChanged, email }) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const { register } = useAuth();

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { error } = await register({ email, password });
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
          {error ? <ErrorMessage error={error} /> : null}
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

function EmailSent({ email }) {
  return (
    <UnauthenticatedAppWrapper>
      <UnauthenticatedAppCard>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-24 h-24 mx-auto mb-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
          />
        </svg>

        <UnauthenticatedAppSubHeading>
          An email is on it's way!
        </UnauthenticatedAppSubHeading>

        <p className="text-center">
          We sent an email to{" "}
          <span className="font-semibold text-gray-800">{email}</span>.
        </p>
        <p className="mt-2 text-center">
          If this email address has an account, you'll find a magic link that
          will sign you into your account.
        </p>
        <p className="mt-2 text-center">
          The link expires in XX hours, so be sure to check it soon.
        </p>
      </UnauthenticatedAppCard>
    </UnauthenticatedAppWrapper>
  );
}
