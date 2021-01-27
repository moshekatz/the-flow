import supabase from "./supabase";

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
    console.log("Login Response: ", { loginResponse });
    return loginResponse;
  },
  register: async ({ email, password }) => {
    const registerResponse = await supabaseClient.auth.signUp({
      email,
      password,
    });
    console.log("Register Response: ", { registerResponse });
    return registerResponse;
  },
  logout: async () => {
    const logoutResponse = await supabaseClient.auth.signOut();
    console.log("Logout Response: ", { logoutResponse });
    return logoutResponse;
  },
  resetPasswordForEmail: async (email) => {
    const resetPasswordForEmailResponse = await supabaseClient.auth.api.resetPasswordForEmail(
      email
    );
    console.log("Reset Password For Email Response: ", {
      resetPasswordForEmailResponse,
    });
    return resetPasswordForEmailResponse;
  },
  updatePassword: async (newPassword) => {
    const updatePasswordResponse = await supabaseClient.auth.update({
      password: newPassword,
    });
    console.log("Update Password Response: ", { updatePasswordResponse });
    return updatePasswordResponse;
  },
  onAuthStateChange: (...props) => {
    const onAuthStateChangeResponse = supabaseClient.auth.onAuthStateChange(
      ...props
    );
    console.log("OnAuthStateChange Reponse: ", { onAuthStateChangeResponse });
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

export default auth;
