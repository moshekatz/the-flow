import React from "react";
import Outgoings from "./pages/outgoings";

export default AuthenticatedApp;

function AuthenticatedApp() {
  // const [error, setError] = React.useState(null);

  return (
    // <main
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <span>Hi I am </span>
    //   <span style={{ fontWeight: "bold" }}>{user.email}</span>
    //   <button onClick={handleLogOut}>Log Out</button>
    //   {/*TODO: error-handling: handle retry and reset error */}
    //   {error ? <ErrorMessage error={error} /> : null}
    //   <br />
    <Outgoings />
    // </main>
  );
}
