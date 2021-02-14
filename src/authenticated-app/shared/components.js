import React from "react";

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

export function Accordion({ title, isOn = false, children }) {
  const [on, toggleOn] = useToggle(isOn);
  return (
    <>
      <button
        type="button"
        onClick={toggleOn}
        className="block text-gray-600 tracking-wide hover:text-gray-800 hover:underline"
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`${
            on ? "rotate-90" : ""
          } inline-block h-5 w-5 transform transition ease-in-out duration-200`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {on ? children : null}
    </>
  );
}
function useToggle(initialValue = false) {
  // Returns the tuple [state, dispatch]
  // Normally with useReducer you pass a value to dispatch to indicate what action to
  // take on the state, but in this case there's only one action.
  return React.useReducer((state) => !state, initialValue);
}

export function StatCard({ title, number, bgColor = "bg-white" }) {
  return (
    <div className={`${bgColor} overflow-hidden shadow rounded-lg`}>
      <div className="px-4 py-5 sm:p-6">
        <dl className="space-y-1">
          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
            {title}
          </dt>
          <dd className="text-lg sm:text-3xl font-semibold text-gray-900">
            {Math.round(number).toLocaleString()}
            <span className="font-normal">₪</span>
          </dd>
        </dl>
      </div>
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg`}>
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-1">
          <div className="animate-pulse h-3 w-10 sm:h-4 sm:w-16 bg-gray-200"></div>
          <div className="animate-pulse h-9 w-16 sm:h-10 sm:w-40 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
