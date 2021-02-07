import { useAuth } from "../../auth/auth-context";

export { YourProfile };

function YourProfile() {
  const { user } = useAuth();

  return <div>Your Email: {user.email}</div>;
}
