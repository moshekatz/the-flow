export function PageHeading({ title }) {
  return (
    <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
      {title}
    </h1>
  );
}

export function PageSubHeading({ title }) {
  return (
    <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
      {title}
    </h2>
  );
}

export function StatCard({ title, number, bgColor = "bg-white" }) {
  return (
    <div className={`${bgColor} overflow-hidden shadow rounded-lg`}>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
            {title}
          </dt>
          <dd className="mt-1 text-lg sm:text-3xl font-semibold text-gray-900">
            {Math.round(number).toLocaleString()}
            <span className="font-normal">₪</span>
          </dd>
        </dl>
      </div>
    </div>
  );
}
