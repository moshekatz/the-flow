import React from "react";
import { Transition } from "@tailwindui/react";
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
  return (
    <>
      <MobileMenu isMobileNavOpen={isMobileNavOpen} />
      <DesktopMenu />
    </>
  );
}

function DesktopMenu() {
  const { currentPage, gotoPage } = useNavigation();
  const { signOut } = useAuth();

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
            onClick={signOut}
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
          <div className="pl-2 text-sm mt-2">
            Made by{" "}
            <a
              href="https://twitter.com/moshekatzdev"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-400 hover:text-blue-500 hover:underline"
            >
              @moshekatzdev
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ isMobileNavOpen }) {
  return (
    <div className="lg:hidden">
      <Transition show={isMobileNavOpen}>
        <div className="fixed inset-0 z-40 flex">
          <MobileMenuOverlay />
          <MobileMenuContent />
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Transition>
    </div>
  );
}

function MobileMenuContent() {
  const { closeMobileNav, currentPage, gotoPage } = useNavigation();
  const { signOut } = useAuth();

  return (
    <Transition.Child
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      {(ref) => (
        <div
          ref={ref}
          className="relative max-w-xs w-full h-full bg-white pt-5 pb-4 flex-1 flex flex-col"
        >
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
            <div className="px-2 space-y-1">
              <button
                onClick={signOut}
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
              <div className="pl-2 text-sm mt-2">
                Made by{" "}
                <a
                  href="https://twitter.com/moshekatzdev"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-400 hover:text-blue-500 hover:underline"
                >
                  @moshekatzdev
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition.Child>
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
  return (
    <Transition.Child
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {(ref) => (
        <div ref={ref} className="fixed inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      )}
    </Transition.Child>
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
