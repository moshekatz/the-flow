import React from "react";
import { useAuth } from "../auth/auth-context";
import { UnauthenticatedAppSubHeading } from "../shared/components";

export default PasswordRecovery;

function PasswordRecovery() {
  const { updatePassword } = useAuth();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target.elements.newpassword.value;
    await updatePassword(newPassword);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-200 via-gray-50 to-yellow-300">
      <div className="fixed top-14 sm:top-1/4 max-w-md w-full space-y-4">
        <UnauthenticatedAppHeader />
        <UnauthenticatedAppCard>
          <main>
            <UnauthenticatedAppSubHeading>
              Reset My Password
            </UnauthenticatedAppSubHeading>
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="newpassword" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="New Password"
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
                  Reset my password
                </button>
              </div>
            </form>
          </main>
        </UnauthenticatedAppCard>
      </div>
    </div>
  );
}

function UnauthenticatedAppHeader() {
  return (
    <div className="flex items-center justify-center space-x-3">
      <img
        width={48} // 48 == h-12
        height={48} // 48 == h-12
        className="h-12"
        src="favicon.svg"
        alt="Workflow"
      />
      <h1 className="text-center text-3xl font-extrabold text-gray-900">
        The Flow
      </h1>
    </div>
  );
}

function UnauthenticatedAppCard({ children }) {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="relative bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {children}
      </div>
    </div>
  );
}
