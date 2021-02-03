import React from "react";
import { useAuth } from "../auth/auth-context";

export default PasswordRecovery;

// TODO: reset-password-flow: design/refactor & testing -> https://security.stackexchange.com/questions/105124/why-should-you-redirect-the-user-to-a-login-page-after-a-password-reset
function PasswordRecovery() {
  const { updatePassword } = useAuth();
  const [error, setError] = React.useState(null);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target.elements.newpassword.value;
    try {
      const { error } = await updatePassword(newPassword);
      if (error) {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Choose a New Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label
            style={{ float: "left", marginRight: "3px" }}
            htmlFor="newpassword"
          >
            New Password:
          </label>
          <input
            style={{ width: "100%", borderRadius: "7px", margin: "8px 0" }}
            type="password"
            name="newpassword"
          ></input>
        </div>
        <button style={{ float: "right", margin: "8px 0" }} type="submit">
          Reset my password
        </button>
      </form>
      {error ? (
        <div role="alert" style={{ color: "red" }}>
          <span>There was an error: </span>
          <pre style={{ whiteSpace: "break-spaces", marginBottom: "-5" }}>
            {error.message}
          </pre>
        </div>
      ) : null}
    </main>
  );
}