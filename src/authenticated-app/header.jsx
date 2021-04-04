import React from "react";
import { useNavigation } from "../context/navigation-context";
import { PrimaryButton } from "./shared/components";

export { Header };

function Header({ searchQuery, onSearchQueryChange, onCreateTransaction }) {
  return (
    <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
      <MobileOpenSideBarButton />

      <div className="flex-1 flex justify-between items-center space-x-1 px-4 sm:px-6 lg:px-0">
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
        />
        <PrimaryButton onClick={onCreateTransaction}>Create</PrimaryButton>
      </div>
    </div>
  );
}

function MobileOpenSideBarButton() {
  const { openMobileNav } = useNavigation();
  return (
    <button
      onClick={openMobileNav}
      className="lg:hidden border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
    >
      <span className="sr-only">Open sidebar</span>
      {/* Heroicon name: menu-alt-2 */}
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    </button>
  );
}

function SearchBar({ searchQuery, onSearchQueryChange }) {
  return (
    <div className="flex-1 flex">
      <form className="w-full flex lg:ml-0">
        <label htmlFor="search_field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            {/* Heroicon name: search */}
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="search_field"
            className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
        </div>
      </form>
    </div>
  );
}
