import React from "react";

import { EnterEmail } from "./enter-email";
import { MagicLinkOrPasswordView } from "./magic-link-or-password";
import { SignUp } from "./sign-up";
import { EmailSent } from "./email-sent";

export default UnauthenticatedApp;

const workflowState = {
  enterEmail: "ENTER_EMAIL",
  magicLinkOrPassword: "SIGN_IN_MAGIC_LINK_OR_PASSWORD",
  signUp: "SIGN_UP",
  emailSent: "EMAIL_SENT",
};

function UnauthenticatedApp() {
  const [workflow, setWorkflow] = React.useState(workflowState.enterEmail);
  const [email, setEmail] = React.useState("");

  switch (workflow) {
    case workflowState.enterEmail: {
      return (
        <EnterEmail
          onContinue={() => {
            setWorkflow(workflowState.magicLinkOrPassword);
          }}
          onGotoSignUp={() => {
            setWorkflow(workflowState.signUp);
          }}
          onEmailChanged={(e) => setEmail(e.target.value)}
          email={email}
        />
      );
    }
    case workflowState.magicLinkOrPassword: {
      return (
        <MagicLinkOrPasswordView
          email={email}
          onBack={() => {
            setWorkflow(workflowState.enterEmail);
          }}
          onMagicLink={() => {
            setWorkflow(workflowState.emailSent);
          }}
        />
      );
    }
    case workflowState.signUp: {
      return (
        <SignUp
          onEmailChanged={(e) => setEmail(e.target.value)}
          email={email}
          onBack={() => {
            setWorkflow(workflowState.enterEmail);
          }}
          onSignUp={() => {
            setWorkflow(workflowState.emailSent);
          }}
        />
      );
    }
    case workflowState.emailSent: {
      return <EmailSent email={email} />;
    }
    default: {
      throw new Error(
        `Unsupported workflow step of type ${workflow} on <UnauthenticatedApp/>.`
      );
    }
  }
}
