import { PageHeading } from "../shared/components";

export const title = "Dashboard";
export const iconSvgPath = (
  /* Heroicon name: chart-bar */
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  />
);

export function Dashboard() {
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0">
        <PageHeading title={title} />
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div>Dashboard!!!!</div>
      </div>
    </div>
  );
}
