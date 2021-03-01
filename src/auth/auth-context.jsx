import React from "react";
import * as authApi from "./auth-provider";

export { AuthProvider, useAuth };

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider({
  LoadingFallback = DeafultLoadingFallback,
  ErrorFallback = DeafultErrorFallback,
  ...props
}) {
  return AuthProviderForApi({
    api: authApi,
    LoadingFallback,
    ErrorFallback,
    ...props,
  });
}

function AuthProviderForApi({ api, LoadingFallback, ErrorFallback, ...props }) {
  const [{ session, error, mode }, setAuthState] = React.useState({
    session: null,
    error: null,
    mode: "IDLE", // 'IDLE' | 'LOADING' | 'ERROR' | 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'PASSWORD_RECOVERY'
  });
  const onError = (error) => {
    setAuthState({ mode: "ERROR", error, session: null });
  };
  React.useEffect(() => {
    api.getSession().then((session) => {
      setAuthState({ mode: "LOADING", session, error: null });
      if (session) {
        console.log({ session });
        setAuthState({ mode: "SIGNED_IN", session, error: null });
      } else {
        setAuthState({ mode: "SIGNED_OUT", session: null, error: null });
      }
    });

    const { authListener, error } = api.onAuthStateChange((event, session) => {
      /* type AuthChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'PASSWORD_RECOVERY' */
      console.log({ event, session });
      setAuthState({
        mode: event,
        session,
        error: null,
      });
    });

    if (error) {
      onError(error);
    }

    return () => authListener.unsubscribe();
  }, [api]);

  const isIdle = mode === "IDLE";
  const isLoading = mode === "LOADING";
  if (isIdle || isLoading) return <LoadingFallback />;
  const isError = mode === "ERROR";
  if (isError) return <ErrorFallback error={error} />;

  const isPasswordRecovery = mode === "PASSWORD_RECOVERY";
  const isSignedOut = mode === "SIGNED_OUT";
  const isSignedIn = mode === "SIGNED_IN";

  const {
    signIn,
    signOut,
    signUp,
    resetPasswordForEmail,
    updatePassword,
  } = api;

  const value = {
    user: session?.user,
    error,
    signIn,
    signOut,
    signUp,
    resetPasswordForEmail,
    updatePassword,
    isPasswordRecovery,
    isSignedOut,
    isSignedIn,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

AuthProvider.Authenticated = Authenticated;
AuthProvider.Unauthenticated = Unauthenticated;
AuthProvider.PasswordRecovery = PasswordRecovery;

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function Authenticated({ children }) {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : null;
}

function Unauthenticated({ children }) {
  const { isSignedOut } = useAuth();
  return isSignedOut ? children : null;
}

function PasswordRecovery({ children }) {
  const { isPasswordRecovery } = useAuth();
  return isPasswordRecovery ? children : null;
}

function DeafultLoadingFallback() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      Loading...
    </div>
  );
}

function DeafultErrorFallback({ error }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      There was an error: {error.message}
    </div>
  );
}
