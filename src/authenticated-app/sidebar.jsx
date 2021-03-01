import React from "react";
import { useNavigation } from "../context/navigation-context";
import { useAuth } from "../auth/auth-context";
import {
  title as myFlowTitle,
  iconSvgPath as myFlowIconSvgPath,
} from "./pages/my-flow";
import {
  title as subscriptionsTitle,
  iconSvgPath as subscriptionsIconSvgPath,
} from "./pages/subscriptions";
import {
  title as dashboardTitle,
  iconSvgPath as dashboardIconSvgPath,
} from "./pages/dashboard";
import {
  title as settingsTitle,
  iconSvgPath as settingsIconSvgPath,
} from "./pages/settings";

export { Sidebar };

const navLinks = [
  {
    title: myFlowTitle,
    svgPath: myFlowIconSvgPath,
  },
  {
    title: subscriptionsTitle,
    svgPath: subscriptionsIconSvgPath,
  },
  {
    title: dashboardTitle,
    svgPath: dashboardIconSvgPath,
  },
  {
    title: settingsTitle,
    svgPath: settingsIconSvgPath,
  },
];

function Sidebar() {
  const { isMobileNavOpen } = useNavigation();
  const { signOut } = useAuth();
  return (
    <>
      {isMobileNavOpen ? <MobileMenu onSignOut={signOut} /> : null}
      <DesktopMenu onSignOut={signOut} />
    </>
  );
}

function DesktopMenu({ onSignOut }) {
  const { currentPage, gotoPage } = useNavigation();

  return (
    <div className="fixed hidden lg:flex lg:flex-shrink-0">
      <div className="w-64 h-screen flex flex-col border-r border-gray-200 pt-5 pb-4 justify-between">
        <nav>
          <MenuLogo />

          <div className="mt-5 flex flex-col">
            <div className=" bg-white px-2 space-y-1">
              {navLinks.map(({ title, svgPath }) => {
                return createNavLink({
                  title,
                  svgPath,
                  onClick: () => gotoPage(title),
                  isCurrent: title === currentPage,
                  isMobile: false,
                });
              })}
            </div>
          </div>
        </nav>
        <div className="mt-5 flex flex-col px-2">
          <button
            onClick={() => {
              // TODO: give-feedback
              alert("TODO");
            }}
            className="text-gray-600 hover:text-gray-900 text-sm group rounded-md py-2 px-2 flex items-center font-medium w-full"
          >
            <svg
              className="text-gray-400 group-hover:text-gray-500 h-6 w-6 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {/* Heroicon name: light bulb */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Give Feedback
          </button>
          <button
            onClick={onSignOut}
            className="text-gray-600 hover:text-gray-900 text-sm group rounded-md py-2 px-2 flex items-center font-medium w-full"
          >
            <svg
              className="text-gray-400 group-hover:text-gray-500 h-6 w-6 mr-3"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onSignOut }) {
  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 z-40 flex">
        <MobileMenuOverlay />
        <MobileMenuContent onSignOut={onSignOut} />
        <div className="flex-shrink-0 w-14">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </div>
  );
}

function MobileMenuContent({ onSignOut }) {
  const { closeMobileNav, currentPage, gotoPage } = useNavigation();
  /* TODO: animations-support
  Off-canvas menu, show/hide based on off-canvas menu state.

  Entering: "transition ease-in-out duration-300 transform"
    From: "-translate-x-full"
    To: "translate-x-0"
  Leaving: "transition ease-in-out duration-300 transform"
    From: "translate-x-0"
    To: "-translate-x-full"
*/
  return (
    <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
      <div className="absolute top-0 right-0 -mr-12 pt-2">
        <MobileOpenMenuButton handleClick={closeMobileNav} />
      </div>

      <MenuLogo />

      <div className="mt-5 flex flex-col justify-between h-full">
        <nav className="px-2 space-y-1">
          {navLinks.map(({ title, svgPath }) => {
            return createNavLink({
              title,
              svgPath,
              onClick: () => gotoPage(title),
              isCurrent: title === currentPage,
              isMobile: true,
            });
          })}
        </nav>
        <div>
          <button
            onClick={() => {
              // TODO: give-feedback
              alert("TODO");
            }}
            className="text-gray-600 hover:text-gray-900 text-base group rounded-md py-2 px-2 flex items-center font-medium w-full"
          >
            <svg
              className="text-gray-400 group-hover:text-gray-500 h-6 w-6 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {/* Heroicon name: light bulb */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Give Feedback
          </button>
          <button
            onClick={onSignOut}
            className="text-gray-600 hover:text-gray-900 text-base group rounded-md py-2 px-2 flex items-center font-medium w-full"
          >
            <svg
              className="text-gray-400 group-hover:text-gray-500 h-6 w-6 mr-4"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileOpenMenuButton({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    >
      <span className="sr-only">Close sidebar</span>
      {/* Heroicon name: x */}
      <svg
        className="h-6 w-6 text-white"
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

function MobileMenuOverlay() {
  /* TODO: animations-support
  Off-canvas menu overlay, show/hide based on off-canvas menu state.

  Entering: "transition-opacity ease-linear duration-300"
    From: "opacity-0"
    To: "opacity-100"
  Leaving: "transition-opacity ease-linear duration-300"
    From: "opacity-100"
    To: "opacity-0"
*/

  return (
    <div className={`fixed inset-0`} aria-hidden="true">
      <div className="absolute inset-0 bg-gray-600 opacity-75" />
    </div>
  );
}

function MenuLogo() {
  return (
    <div className="flex-shrink-0 px-4 flex items-center text-xl font-extrabold">
      🌊 The Flow
    </div>
  );
}

function createNavLink({ title, svgPath, onClick, isCurrent, isMobile }) {
  return (
    <button
      key={title}
      onClick={onClick}
      className={`${
        isCurrent
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      } ${
        isMobile ? "text-base" : "text-sm"
      } group rounded-md py-2 px-2 flex items-center font-medium w-full`}
    >
      <svg
        className={`${
          isCurrent
            ? "text-gray-500"
            : "text-gray-400 group-hover:text-gray-500"
        } h-6 w-6 ${isMobile ? "mr-4" : "mr-3"}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {svgPath}
      </svg>
      {title}
    </button>
  );
}
