export { NotFound };

function NotFound() {
  // TODO: useNavigation
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0 flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
          Not Found
        </h1>
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div>Go back home</div>
      </div>
    </div>
  );
}
