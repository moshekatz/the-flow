import { supabase } from "../supabase";

const createSupabaseAuth = (supabaseClient) => ({
  signUp: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email.toLowerCase(),
      password,
    });
    return { user: data?.user, session: data?.session, error };
  },
  signIn: async ({ email, password, provider }) => {
    if (provider) {
      // OAuth provider login
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider,
      });
      return { user: data?.user, session: data?.session, error };
    } else {
      // Email/password login
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });
      return { user: data?.user, session: data?.session, error };
    }
  },
  signOut: async () => {
    const { error } = await supabaseClient.auth.signOut();
    return { error };
  },
  resetPasswordForEmail: async (email) => {
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
      email.toLowerCase()
    );
    return { data, error };
  },
  updatePassword: async (newPassword) => {
    const { data, error } = await supabaseClient.auth.updateUser({
      password: newPassword,
    });
    return { user: data?.user, error };
  },
  onAuthStateChange: (...props) => {
    const { data, error } = supabaseClient.auth.onAuthStateChange(...props);
    return { authListener: data, error };
  },
  getSession: async () => {
    const { data, error } = await supabaseClient.auth.getSession();
    return data?.session;
  },
});

const auth = createSupabaseAuth(supabase);
export const {
  signUp,
  signIn,
  signOut,
  resetPasswordForEmail,
  updatePassword,
  onAuthStateChange,
  getSession,
} = auth;
