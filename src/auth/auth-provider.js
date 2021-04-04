import { supabase } from "../supabase";

const createSupabaseAuth = (supabaseClient) => ({
  signUp: async ({ email, password }) => {
    const { user, session, error } = await supabaseClient.auth.signUp({
      email: email.toLowerCase(),
      password,
    });
    return { user, session, error };
  },
  signIn: async ({ email, password, provider }) => {
    const { user, session, error } = await supabaseClient.auth.signIn({
      email: email.toLowerCase(),
      password,
      provider,
    });
    return { user, session, error };
  },
  signOut: async () => {
    const { error } = await supabaseClient.auth.signOut();
    return { error };
  },
  resetPasswordForEmail: async (email) => {
    const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email.toLowerCase()
    );

    return { data, error };
  },
  updatePassword: async (newPassword) => {
    const { user, error } = await supabaseClient.auth.update({
      password: newPassword,
    });
    return { user, error };
  },
  onAuthStateChange: (...props) => {
    const { data: authListener, error } = supabaseClient.auth.onAuthStateChange(
      ...props
    );
    return { authListener, error };
  },
  getSession: () => {
    return supabase.auth.session();
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
