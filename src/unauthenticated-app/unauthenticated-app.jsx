import React from "react";

import { EnterEmail } from "./enter-email";
import { MagicLinkOrPasswordView } from "./magic-link-or-password";
import { SignUp } from "./sign-up";
import { EmailSent } from "./email-sent";

export default UnauthenticatedApp;

const workflows = {
  enterEmail: "ENTER_EMAIL",
  magicLinkOrPassword: "SIGN_IN_MAGIC_LINK_OR_PASSWORD",
  signUp: "SIGN_UP",
  emailSent: "EMAIL_SENT",
};

function UnauthenticatedApp() {
  const [workflow, setWorkflow] = React.useState(workflows.enterEmail);
  const [email, setEmail] = React.useState("");

  let view;
  switch (workflow) {
    case workflows.enterEmail: {
      view = (
        <EnterEmail
          onContinue={(e) => {
            e.preventDefault();
            setWorkflow(workflows.magicLinkOrPassword);
          }}
          onEmailChanged={(e) => setEmail(e.target.value)}
          email={email}
        />
      );
      break;
    }
    case workflows.magicLinkOrPassword: {
      view = (
        <MagicLinkOrPasswordView
          email={email}
          onMagicLink={() => {
            setWorkflow(workflows.emailSent);
          }}
        />
      );
      break;
    }
    case workflows.signUp: {
      view = (
        <SignUp
          onEmailChanged={(e) => setEmail(e.target.value)}
          email={email}
          onSignUp={() => {
            setWorkflow(workflows.emailSent);
          }}
        />
      );
      break;
    }
    case workflows.emailSent: {
      view = <EmailSent email={email} />;
      break;
    }
    default: {
      throw new Error(
        `Unsupported workflow step of type ${workflow} on <UnauthenticatedApp/>.`
      );
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-200 via-gray-50 to-yellow-300">
      <div className="fixed top-14 sm:top-1/4 max-w-md w-full space-y-4">
        <UnauthenticatedAppHeader />
        <UnauthenticatedAppCard>
          {[workflows.magicLinkOrPassword, workflows.signUp].includes(
            workflow
          ) && (
            <UnauthenticatedAppTopLeftCardButton
              onClick={() => setWorkflow(workflows.enterEmail)}
            >
              Back
            </UnauthenticatedAppTopLeftCardButton>
          )}
          {view}
        </UnauthenticatedAppCard>
        {workflow === workflows.enterEmail && (
          <div className="flex flex-col items-center justify-center">
            <p className="mt-6 text-center text-xl font-bold text-gray-900">
              Don't have an account yet?
            </p>
            <button
              onClick={() => setWorkflow(workflows.signUp)}
              className="mt-3 py-2 px-4 border border-blue-600 font-medium rounded-md bg-gray-100 text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UnauthenticatedAppHeader() {
  return (
    <div className="flex items-center justify-center space-x-3">
      <img
        width={48} // 48 == h-12
        height={48} // 48 == h-12
        className="h-12"
        src="favicon.svg"
        alt="Workflow"
      />
      <h1 className="text-center text-3xl font-extrabold text-gray-900">
        The Flow
      </h1>
    </div>
  );
}

function UnauthenticatedAppCard({ children }) {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="relative bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {children}
      </div>
    </div>
  );
}

function UnauthenticatedAppTopLeftCardButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 left-2 py-1 px-2 border border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-gray-500 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}
