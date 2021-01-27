import React from "react";
import { useAuth } from "./auth-context";
import { ErrorMessage } from "./components";

export default TailwindLogin;

function TailwindLogin() {
  // eslint-disable-next-line no-unused-vars
  const { login, register, resetPasswordForEmail } = useAuth();
  const [error, setError] = React.useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = e.target.elements;
      const signInProps = { email: email.value, password: password.value };
      const { error } = await login(signInProps);
      if (error) {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex items-center justify-center space-x-3">
            {/* 48 == h-12 */}
            <img
              width={48}
              height={48}
              className="h-12"
              src="favicon.svg"
              alt="Workflow"
            />
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              The Flow
            </h1>
          </div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/trial"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create new account
            </a>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSignIn}>
          <input type="hidden" name="remember" defaultValue="true" />
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="/password-reset"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: lock-closed */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
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
              Sign in
            </button>
          </div>
        </form>
      </div>

      {error ? <ErrorMessage error={error} /> : null}
    </div>
  );
}

// function UnauthenticatedApp() {
//   const { login, register, resetPasswordForEmail } = useAuth();
//   const [error, setError] = React.useState(null);

//   // TODO: is-memo-premature-optimization
//   const signInFormProps = React.useMemo(
//     () => ({
//       elements: [
//         { type: "email", name: "email" },
//         { type: "password", name: "password" },
//         { type: "submit", name: "Sign In" },
//       ],
//       onSubmit: async ({ email, password, provider }) => {
//         try {
//           const { error } = await login({ email, password, provider });
//           if (error) {
//             setError(error);
//           }
//         } catch (error) {
//           setError(error);
//         }
//       },
//     }),
//     [login]
//   );

//   const signUpFormProps = {
//     elements: [
//       { type: "email", name: "email" },
//       { type: "password", name: "password" },
//       { type: "submit", name: "Sign Up" },
//     ],
//     onSubmit: async ({ email, password }) => {
//       try {
//         const { error } = await register({ email, password });
//         if (error) {
//           setError(error);
//         }
//       } catch (error) {
//         setError(error);
//       }
//     },
//   };

//   const resetPasswordFormProps = {
//     elements: [
//       { type: "email", name: "email" },
//       { type: "submit", name: "Reset Password" },
//     ],
//     onSubmit: async ({ email }) => {
//       try {
//         const { error } = await resetPasswordForEmail(email);
//         if (error) {
//           setError(error);
//         }
//       } catch (error) {
//         setError(error);
//       }
//     },
//   };

//   return (
//     <main
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <h2>Sign In</h2>
//       <Form {...signInFormProps} />
//       <h3>Sign Up</h3>
//       <Form {...signUpFormProps} />
//       <h3>Forgot my Password :(</h3>
//       <Form {...resetPasswordFormProps} />
//       {error ? <ErrorMessage error={error} /> : null}
//     </main>
//   );
// }
