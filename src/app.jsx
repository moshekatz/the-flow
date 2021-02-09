import React from "react";
import { AuthProvider } from "./auth/auth-context";
import { NavigationProvider } from "./context/navigation-context"; //TODO: should be context and not a hook?

//TODO: lazy-load
import AuthenticatedApp from "./authenticated-app/authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app/unauthenticated-app";
import PasswordRecovery from "./password-recovery/password-recovery";

export default App;

function App() {
  return (
    <>
      <AuthProvider>
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
    </>
  );
}
