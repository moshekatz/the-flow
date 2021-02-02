import React from "react";
import { useAuth } from "../auth/auth-context";
import { useOutsideAlerter } from "../hooks/hooks";

export { Header };

function Header({ setMenuOpen, onNavigate }) {
  return (
    <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
      <MobileOpenSideBarButton handleClick={() => setMenuOpen(true)} />

      <div className="flex-1 flex justify-between px-4 md:px-0">
        <SearchBar />

        <div className="ml-4 flex items-center md:ml-6">
          <ProfileDropdown onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

function MobileOpenSideBarButton({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="md:hidden border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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

function SearchBar() {
  return (
    <div className="flex-1 flex">
      <form className="w-full flex md:ml-0" action="#" method="GET">
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
          />
        </div>
      </form>
    </div>
  );
}

function ProfileDropdown({ onNavigate }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const profileDropdownRef = React.useRef();
  useOutsideAlerter(profileDropdownRef, () => {
    if (profileDropdownOpen) {
      setProfileDropdownOpen(false);
    }
  });

  const { logout } = useAuth();
  const handleLogOut = async () => {
    await logout();
    // TODO: handle-error-sign-out
    // if (error) {
    //   setError(error);
    // }
  };

  return (
    <div ref={profileDropdownRef} className="ml-3 relative">
      <div>
        <button
          onClick={() => setProfileDropdownOpen((isOpen) => !isOpen)}
          className="max-w-xs p-2 flex items-center text-sm rounded-full text-gray-400 hover:text-gray-600 focus:text-gray-600 focus:bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="user-menu"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      {/* TODO: Animations
        Profile dropdown panel, show/hide based on dropdown state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      */}
      <div
        className={`${
          profileDropdownOpen ? "" : "hidden"
        } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        {/* TODO: anchor or buttons? */}
        <button
          className="w-full text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => {
            onNavigate("Your Profile");
            setProfileDropdownOpen(false);
          }}
        >
          Your Profile
        </button>
        <button
          className="w-full text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => {
            onNavigate("Settings");
            setProfileDropdownOpen(false);
          }}
        >
          Settings
        </button>
        <button
          // href="/"
          className="w-full text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => handleLogOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
