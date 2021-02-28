import React from "react";
import { useNavigation } from "../context/navigation-context";
import {
  title as myFlowTitle,
  iconSvgPath as myFlowIcomSvgPath,
} from "./pages/my-flow";
import {
  title as subscriptionsTitle,
  iconSvgPath as subscriptionsIcomSvgPath,
} from "./pages/subscriptions";
import {
  title as dashboardTitle,
  iconSvgPath as dashboardIcomSvgPath,
} from "./pages/dashboard";

export { Sidebar };

const navLinks = [
  {
    title: myFlowTitle,
    svgPath: myFlowIcomSvgPath,
  },
  {
    title: subscriptionsTitle,
    svgPath: subscriptionsIcomSvgPath,
  },
  {
    title: dashboardTitle,
    svgPath: dashboardIcomSvgPath,
  },
];
function Sidebar() {
  const { isMobileNavOpen } = useNavigation();
  return (
    <>
      {isMobileNavOpen ? <MobileMenu /> : null}
      <DesktopMenu />
    </>
  );
}

function DesktopMenu() {
  const { currentPage, gotoPage } = useNavigation();
  return (
    <div className="fixed hidden lg:flex lg:flex-shrink-0">
      <div className="w-48 lg:w-64 h-screen flex flex-col">
        <div className="border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow">
          <MenuLogo />

          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 bg-white px-2 space-y-1">
              {navLinks.map(({ title, svgPath }) => {
                return createNavLink({ title, svgPath }, gotoPage, {
                  isCurrent: title === currentPage,
                  isMobile: false,
                });
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 z-40 flex">
        <MobileMenuOverlay />
        <MobileMenuContent />
        <div className="flex-shrink-0 w-14">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </div>
  );
}

function MobileMenuContent() {
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
    <div
      className={
        "relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col"
      }
    >
      <div className="absolute top-0 right-0 -mr-12 pt-2">
        <MobileOpenMenuButton handleClick={closeMobileNav} />
      </div>

      <MenuLogo />

      <div className="mt-5 flex-1 h-0">
        <nav className="px-2 space-y-1">
          {navLinks.map(({ title, svgPath }) => {
            return createNavLink({ title, svgPath }, gotoPage, {
              isCurrent: title === currentPage,
              isMobile: true,
            });
          })}
        </nav>
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

function createNavLink(
  { title, svgPath },
  onNavigate,
  { isCurrent, isMobile }
) {
  return (
    <button
      key={title}
      onClick={() => {
        onNavigate(title);
      }}
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
