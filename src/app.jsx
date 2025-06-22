import React from "react";
import { AuthProvider } from "./auth/auth-context";
import { NavigationProvider } from "./context/navigation-context";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./shared/components";

import AuthenticatedApp from "./authenticated-app/authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app/unauthenticated-app";
import PasswordRecovery from "./password-recovery/password-recovery";

export default App;

function App() {
  console.log("🚀 App component rendering");
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback("Something went wrong:")}
      onError={(error, errorInfo) => {
        console.error("🚨 App Error Boundary caught:", error);
        console.error("🚨 Error info:", errorInfo);
      }}
    >
      <AuthProvider LoadingFallback={LoadingWave}>
        <AuthProvider.Authenticated>
          <NavigationProvider>
            <AuthenticatedApp />
          </NavigationProvider>
        </AuthProvider.Authenticated>

        <AuthProvider.Unauthenticated>
          <UnauthenticatedApp />
        </AuthProvider.Unauthenticated>

        <AuthProvider.PasswordRecovery>
          <PasswordRecovery />
        </AuthProvider.PasswordRecovery>
      </AuthProvider>
    </ErrorBoundary>
  );
}

function LoadingWave() {
  console.log("🌊 Loading component rendering");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="text-6xl animate-spin">🌊</div>
        <div className="mt-4 text-xl text-gray-600">Loading The Flow...</div>
        <div className="mt-2 text-sm text-gray-400">
          Initializing authentication...
        </div>
      </div>
    </div>
  );
}
