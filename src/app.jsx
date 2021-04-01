import React, { Suspense } from "react";
import { AuthProvider } from "./auth/auth-context";
import { NavigationProvider } from "./context/navigation-context";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./shared/components";
import { logReactErrorBoundaryToAnalyticsService } from "./analytics";

const AuthenticatedApp = React.lazy(() =>
  import("./authenticated-app/authenticated-app")
);
const UnauthenticatedApp = React.lazy(() =>
  import("./unauthenticated-app/unauthenticated-app")
);
const PasswordRecovery = React.lazy(() =>
  import("./password-recovery/password-recovery")
);

export default App;

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback("Something went wrong:")}
      onError={logReactErrorBoundaryToAnalyticsService}
    >
      <Suspense fallback={LoadingWave}>
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
      </Suspense>
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
