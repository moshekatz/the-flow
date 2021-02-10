import { PageHeading } from "../shared/components";

export const title = "Settings";

export function Settings() {
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0">
        <PageHeading title={title} />
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div>Settings!!!!</div>
      </div>
    </div>
  );
}
