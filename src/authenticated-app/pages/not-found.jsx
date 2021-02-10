import { PageHeading } from "../shared/components";
import { useNavigation } from "../../context/navigation-context";

export { NotFound };

function NotFound() {
  const { goToDefault } = useNavigation();
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0">
        <PageHeading title="Not Found" />
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <button
          type="button"
          className="group inline-flex items-center mr-1 px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={goToDefault}
        >
          Go back home
        </button>
      </div>
    </div>
  );
}
