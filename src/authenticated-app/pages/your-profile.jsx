import { useAuth } from "../../auth/auth-context";

export { YourProfile };

function YourProfile() {
  const { user } = useAuth();

  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0 flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
          {/*TODO: duplication?*/}
          {/* {selectedNav} */}
          Your Profile
        </h1>
        <div>
          <button
            type="button"
            // TODO: onClick={() => setCreateMode(true)}
            className="group inline-flex items-center mr-1 px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div>Your Email: {user.email}</div>
      </div>
    </div>
  );
}
