import React from "react";
import {
  login,
  register,
  logout,
  resetPasswordForEmail,
  updatePassword,
  onAuthStateChange,
} from "./auth-provider";

export { AuthProvider, useAuth };

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const [{ user, error, isPasswordRecovery }, setAuthState] = React.useState(
    () => ({
      // TODO: secure-persist-session?
      user: localStorage["supabase.auth.token"]
        ? JSON.parse(localStorage["supabase.auth.token"]).currentSession.user
        : null,
      error: null,
      isPasswordRecovery: false,
    })
  );

  React.useEffect(() => {
    const { authListener, error } = onAuthStateChange((event, session) => {
      console.log({ event, session });
      /* type AuthChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'PASSWORD_RECOVERY' */
      const isPasswordRecovery = event === "PASSWORD_RECOVERY";
      setAuthState({ user: session?.user, error: null, isPasswordRecovery });
    });

    if (error) {
      setAuthState({ error, user: null, isPasswordRecovery: false });
    }

    return () => authListener.unsubscribe();
  }, []);

  // TODO: validate-optimization?
  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      resetPasswordForEmail,
      isPasswordRecovery,
      updatePassword,
    }),
    [isPasswordRecovery, user]
  );

  // TODO: idle-loading-state: isLoading || isIdle handling? Should change flags to status? Check slow connection.

  if (error) {
    return <div style={{ color: "red" }}>Fullpage error: {error.message}</div>;
  }

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
  const { user, isPasswordRecovery } = useAuth();
  return user && !isPasswordRecovery ? children : null;
}

function Unauthenticated({ children }) {
  const { user, isPasswordRecovery } = useAuth();
  return !user && !isPasswordRecovery ? children : null;
}

function PasswordRecovery({ children }) {
  const { isPasswordRecovery } = useAuth();
  return isPasswordRecovery ? children : null;
}
