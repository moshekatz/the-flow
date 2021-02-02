import { supabase } from "../supabase";

// TODO: better-responses-and-no-logging
const createSupabaseAuth = (supabaseClient) => ({
  /* TODO: persist-session: Check for user already logged in? */
  // getUser: () => {
  //   supabaseClient.auth.user();
  // },
  login: async ({ email, password, provider }) => {
    const loginResponse = await supabaseClient.auth.signIn({
      email,
      password,
      provider,
    });
    return loginResponse;
  },
  register: async ({ email, password }) => {
    const registerResponse = await supabaseClient.auth.signUp({
      email,
      password,
    });
    return registerResponse;
  },
  logout: async () => {
    const logoutResponse = await supabaseClient.auth.signOut();
    return logoutResponse;
  },
  resetPasswordForEmail: async (email) => {
    const resetPasswordForEmailResponse = await supabaseClient.auth.api.resetPasswordForEmail(
      email
    );

    return resetPasswordForEmailResponse;
  },
  updatePassword: async (newPassword) => {
    const updatePasswordResponse = await supabaseClient.auth.update({
      password: newPassword,
    });
    return updatePasswordResponse;
  },
  onAuthStateChange: (...props) => {
    const onAuthStateChangeResponse = supabaseClient.auth.onAuthStateChange(
      ...props
    );
    const { data: authListener, error } = onAuthStateChangeResponse;
    return { authListener, error };
  },
});

const auth = createSupabaseAuth(supabase);
export const {
  login,
  register,
  logout,
  resetPasswordForEmail,
  updatePassword,
  onAuthStateChange,
} = auth;
