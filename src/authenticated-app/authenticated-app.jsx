import React from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { TransactionSlideOver } from "./transaction-slide-over";
import { MyFlow } from "./pages/my-flow";
import { Subscriptions } from "./pages/subscriptions";
import { Dashboard } from "./pages/dashboard";
import { Settings } from "./pages/settings";
import { YourProfile } from "./pages/your-profile";

import { TransactionsProvider } from "../api/transactions/transactions-api-hooks";

export default AuthenticatedApp;

const navLinks = [
  {
    title: "My Flow",
    svgPath: (
      /* Heroicon name: home */
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
  },
  {
    title: "Subscriptions",
    svgPath: (
      /* Heroicon name: refresh */
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    ),
  },
  {
    title: "Dashboard",
    svgPath: (
      /* Heroicon name: chart-bar */
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
];

function AuthenticatedApp() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [selectedNav, setSelectedNav] = React.useState("My Flow");
  const [createMode, setCreateMode] = React.useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = React.useState(
    null
  );
  const editMode = selectedTransactionId !== null;
  const showTransactionSlideOver = createMode || editMode;
  const shouldHideScrollbar = showTransactionSlideOver || menuOpen;

  const onNavigate = (navigateToTitle) => {
    setSelectedNav(navigateToTitle);
    setMenuOpen(false);
  };

  let view;

  switch (selectedNav) {
    case "My Flow": {
      view = (
        <MyFlow
          onSelectTransaction={(id) => {
            setSelectedTransactionId(id);
          }}
        />
      );
      break;
    }
    case "Subscriptions": {
      view = <Subscriptions />;
      break;
    }
    case "Dashboard": {
      view = <Dashboard />;
      break;
    }
    case "Settings": {
      view = <Settings />;
      break;
    }
    case "Your Profile": {
      view = <YourProfile />;
      break;
    }
    default: {
      view = null;
      break;
    }
  }

  return (
    <div
      className={`h-screen bg-white flex ${
        shouldHideScrollbar ? "overflow-y-hidden" : ""
      }`}
    >
      <Sidebar
        onNavigate={onNavigate}
        navLinks={navLinks}
        selectedNav={selectedNav}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className="flex-1 lg:max-w-4xl mx-auto w-0 flex flex-col lg:px-8 xl:px-0">
        <Header setMenuOpen={setMenuOpen} onNavigate={onNavigate} />
        <TransactionsProvider>
          <div className="flex ">
            <main
              className="flex-1 relative px-2  focus:outline-none"
              tabIndex={0}
            >
              {view ? (
                <div className="py-3 space-y-3">
                  <div className="px-4 sm:px-6 lg:px-0 flex items-center justify-between ">
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
                      {selectedNav}
                    </h1>
                    <div>
                      <button
                        type="button"
                        onClick={() => setCreateMode(true)}
                        className="group inline-flex items-center mr-1 px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                  <div className="text-center sm:text-lg">
                    <DirectionFilterDropDown /> transactions{" "}
                    <button className="text-gray-700 underline font-semibold hover:text-gray-800">
                      this month
                    </button>
                  </div>
                  <div className="px-4 sm:px-6 lg:px-0">{view}</div>
                </div>
              ) : (
                <div>Are You Lost?</div>
              )}
            </main>
            {showTransactionSlideOver ? (
              <TransactionSlideOver
                handleClose={(e) => {
                  setSelectedTransactionId(null);
                  setCreateMode(false);
                }}
                transactionId={selectedTransactionId}
              />
            ) : null}
          </div>
        </TransactionsProvider>
      </div>
    </div>
  );
}

function DirectionFilterDropDown({ onDirectionFilterChange }) {
  const [directionFilterDropDown, setDirectionFilterDropDown] = React.useState(
    false
  );

  return (
    <div className="ml-1  relative inline-block">
      <button
        onClick={() => setDirectionFilterDropDown((isOpen) => !isOpen)}
        className="text-gray-700 underline font-semibold hover:text-gray-800 focus:text-gray-800 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        id="user-menu"
        aria-haspopup="true"
      >
        <span className="sr-only">Open Direction Filter</span>
        All
      </button>

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
          directionFilterDropDown ? "" : "hidden"
        } origin-top absolute top-6 -left-24 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        {/* TODO: anchor or buttons? */}
        <button
          className="w-full text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => {
            onDirectionFilterChange("Your Profile");
            setDirectionFilterDropDown(false);
          }}
        >
          All
        </button>
        <button
          className="w-full text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => {
            onDirectionFilterChange("Settings");
            setDirectionFilterDropDown(false);
          }}
        >
          Outgoing
        </button>
        <button
          // href="/"
          className="w-full text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => {
            onDirectionFilterChange("Settings");
            setDirectionFilterDropDown(false);
          }}
        >
          Incoming
        </button>
      </div>
    </div>
  );
}
