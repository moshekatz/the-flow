import { UnauthenticatedAppSubHeading } from "./shared/components";

export { EmailSent };

function EmailSent({ email }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-24 h-24 mx-auto mb-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
        />
      </svg>

      <UnauthenticatedAppSubHeading>
        An email is on its way!
      </UnauthenticatedAppSubHeading>

      <p className="text-center">
        We sent an email to{" "}
        <span className="font-semibold text-gray-800">{email}</span>.
      </p>
      <p className="mt-2 text-center">
        If this email address already has an account or was just used to sign
        up, you'll find a magic link that will sign you into your account.
      </p>
    </>
  );
}
