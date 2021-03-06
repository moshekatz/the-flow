import { useAuth } from "../../auth/auth-context";
import { PageHeading } from "../shared/components";

export const title = "Settings";
export const iconSvgPath = (
  /* Heroicon name: cog */
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </>
);

export function Settings() {
  const { user } = useAuth();
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0">
        <PageHeading title={title} />
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div>
          <span className="font-semibold">Logged in user:</span> {user.email}
        </div>
        <div className="mt-6">
          More features will be added in future versions:
        </div>
        <ul>
          <li className="ml-2">- Managing the default currency</li>
          <li className="ml-2">- Switching themes</li>
          <li className="ml-2">- Deleting the account</li>
          <li className="ml-2">
            - Much more - please submit your feedback! :)
          </li>
        </ul>
      </div>
    </div>
  );
}
