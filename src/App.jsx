import React from "react";
import { AuthProvider } from "./auth-context";
// import { Header } from "./components";

//TODO: lazy-load
import AuthenticatedApp from "./authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app";
import PasswordRecovery from "./password-recovery";

export default App;

function App() {
  return (
    <>
      {/* <Header heading="The Flow" /> */}
      <AuthProvider>
        <AuthProvider.Authenticated>
          <AuthenticatedApp />
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
