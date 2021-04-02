import React from "react";
import * as authApi from "./auth-provider";
import { useErrorHandler } from "react-error-boundary";

export { AuthProvider, useAuth };

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider({ LoadingFallback = DeafultLoadingFallback, ...props }) {
  return AuthProviderForApi({
    api: authApi,
    LoadingFallback,
    ...props,
  });
}

function AuthProviderForApi({ api, LoadingFallback, ...props }) {
  const [{ session, error, mode }, setAuthState] = React.useState({
    session: null,
    error: null,
    mode: "LOADING", // 'LOADING' | 'ERROR' | 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'PASSWORD_RECOVERY'
  });
  useErrorHandler(error);

  const handleError = (error) => {
    setAuthState({ mode: "ERROR", error, session: null });
  };
  React.useEffect(() => {
    const session = api.getSession();
    if (session) {
      setAuthState({ mode: "SIGNED_IN", session, error: null });
    } else {
      setAuthState({ mode: "SIGNED_OUT", session: null, error: null });
    }

    const { authListener, error } = api.onAuthStateChange((event, session) => {
      /* type AuthChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'PASSWORD_RECOVERY' */
      if (event === "USER_UPDATED") {
        api.signOut().catch((error) => {
          handleError(error);
        });
      } else {
        setAuthState({
          mode: event,
          session,
          error: null,
        });
      }
    });

    if (error) {
      handleError(error);
    }

    return () => authListener.unsubscribe();
  }, [api]);

  const isLoading = mode === "LOADING";
  if (isLoading) return <LoadingFallback />;

  const isPasswordRecovery = mode === "PASSWORD_RECOVERY";
  const isSignedOut = mode === "SIGNED_OUT";
  const isSignedIn = mode === "SIGNED_IN";

  const signIn = async ({ email, password, provider }) => {
    const { error } = await api.signIn({
      email,
      password,
      provider,
    });
    if (error) {
      handleError(error);
    }
  };

  const signOut = async () => {
    const { error } = await api.signOut();
    if (error) {
      handleError(error);
    }
  };

  const signUp = async ({ email, password }) => {
    const { error } = await api.signUp({
      email,
      password,
    });
    if (error) {
      handleError(error);
    }
  };

  const resetPasswordForEmail = async (email) => {
    const { error } = await api.resetPasswordForEmail(email);
    if (error) {
      handleError(error);
    }
  };

  const updatePassword = async (newPassword) => {
    const { error } = await api.updatePassword(newPassword);
    if (error) {
      handleError(error);
    }
  };

  const value = {
    user: session?.user,
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
