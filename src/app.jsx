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
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback("Something went wrong:")}
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
  return (
    <div className="min-h-screen flex justify-center items-center text-xl animate-spin">
      🌊
    </div>
  );
}
