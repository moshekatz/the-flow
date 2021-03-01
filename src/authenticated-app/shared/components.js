import React from "react";
import { useOutsideAlerter } from "../../hooks/hooks";

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

export function Dropdown({ dropdownOptions, onOptionSelected }) {
  // TODO: const {isDropdownOpen, toggle, close, open, ref} = useDropdown()
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const toggleIsDropdownOpen = () =>
    setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const dropdownRef = React.useRef();
  useOutsideAlerter(dropdownRef, () => {
    if (isDropdownOpen) {
      closeDropdown();
    }
  });

  const selectedOptionTitle = calculateOptionToShow(dropdownOptions);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={toggleIsDropdownOpen}
        className="bg-gray-100 hover:bg-gray-200 h-10 focus:outline-none focus:shadow-outline-gray text-xs md:text-sm px-2 md:px-3 flex items-center text-gray-800 truncate text-center md:text-left font-semibold rounded-lg relative md:shadow overflow-hidden"
      >
        {selectedOptionTitle}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          height={20}
          className="ml-2 text-gray-600 transform rotate-90"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isDropdownOpen ? (
        <div className="absolute top-14 z-10">
          <div
            className="bg-white shadow-lg rounded-lg text-cool-gray-900 overflow-hidden"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="flex flex-1">
              <div className="flex flex-col p-1 space-y-1">
                {dropdownOptions.map(({ title, key, isSelected }) => {
                  return (
                    <button
                      key={title}
                      onClick={() => {
                        closeDropdown();
                        onOptionSelected(key);
                      }}
                      className={`flex items-start py-2 text-xs rounded px-5 justify-center hover:bg-gray-200 focus:outline-none focus:bg-gray-300 font-medium ${
                        isSelected ? "bg-gray-300" : ""
                      }`}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PrimaryButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
}

function calculateOptionToShow(dropdownOptions) {
  let optionToShow;
  dropdownOptions.forEach(({ isSelected, title }) => {
    if (isSelected) {
      optionToShow = title;
    }
  });
  return optionToShow;
}

export const categoryToColorMap = {
  Apartment: "bg-red-500",
  Food: "bg-rose-500",
  Essentials: "bg-fuchsia-500",
  Entertainment: "bg-emerald-500",
  DevTools: "bg-indigo-500",
  Savings: "bg-pink-500",
  Transportation: "bg-orange-500",
  Clothing: "bg-blue-500",
  Health: "bg-green-500",
  Other: "bg-gray-500",
};
