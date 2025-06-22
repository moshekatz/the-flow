import React from "react";
import * as authApi from "./auth-provider";
import { useErrorBoundary } from "react-error-boundary";

export { AuthProvider, useAuth };

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider({ LoadingFallback = DefaultLoadingFallback, ...props }) {
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
  const { showBoundary } = useErrorBoundary();

  React.useEffect(() => {
    if (error) {
      showBoundary(error);
    }
  }, [error, showBoundary]);

  const handleError = (error) => {
    setAuthState({ mode: "ERROR", error, session: null });
  };
  React.useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("🔐 Initializing auth...");
        const session = await api.getSession();
        console.log(
          "🔐 Auth session:",
          session ? "Found session" : "No session"
        );
        if (session) {
          console.log("🔐 Setting state to SIGNED_IN");
          setAuthState({ mode: "SIGNED_IN", session, error: null });
        } else {
          console.log("🔐 Setting state to SIGNED_OUT");
          setAuthState({ mode: "SIGNED_OUT", session: null, error: null });
        }
      } catch (error) {
        console.error("🔐 Auth initialization error:", error);
        handleError(error);
      }
    };

    initializeAuth();

    const { authListener, error } = api.onAuthStateChange((event, session) => {
      console.log(
        "🔐 Auth state change event:",
        event,
        session ? "with session" : "no session"
      );
      /* type AuthChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'PASSWORD_RECOVERY' | 'INITIAL_SESSION' */
      if (event === "USER_UPDATED") {
        api.signOut().catch((error) => {
          handleError(error);
        });
      } else if (event === "INITIAL_SESSION") {
        // Handle initial session - set appropriate state based on whether we have a session
        if (session) {
          setAuthState({ mode: "SIGNED_IN", session, error: null });
        } else {
          setAuthState({ mode: "SIGNED_OUT", session: null, error: null });
        }
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

    return () => authListener?.subscription?.unsubscribe();
  }, [api]);

  const isLoading = mode === "LOADING";
  const isPasswordRecovery = mode === "PASSWORD_RECOVERY";
  const isSignedOut = mode === "SIGNED_OUT";
  const isSignedIn = mode === "SIGNED_IN";

  console.log("🔐 AuthProvider render state:", {
    mode,
    isLoading,
    isSignedOut,
    isSignedIn,
    isPasswordRecovery,
    hasSession: !!session,
  });

  if (isLoading) return <LoadingFallback />;

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
  console.log("🔐 Authenticated component - isSignedIn:", isSignedIn);
  return isSignedIn ? children : null;
}

function Unauthenticated({ children }) {
  const { isSignedOut } = useAuth();
  console.log("🔐 Unauthenticated component - isSignedOut:", isSignedOut);
  return isSignedOut ? children : null;
}

function PasswordRecovery({ children }) {
  const { isPasswordRecovery } = useAuth();
  console.log(
    "🔐 PasswordRecovery component - isPasswordRecovery:",
    isPasswordRecovery
  );
  return isPasswordRecovery ? children : null;
}

function DefaultLoadingFallback() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      Loading...
    </div>
  );
}
