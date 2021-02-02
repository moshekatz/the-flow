import React from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { CreateSlideOver } from "./create-slide-over";
import { Outgoings } from "./pages/outgoings";
import { Subscriptions } from "./pages/subscriptions";
import { Dashboard } from "./pages/dashboard";
import { Settings } from "./pages/settings";
import { YourProfile } from "./pages/your-profile";

import { useOutgoings } from "../api/outgoings/outgoings-api-hooks";
// import { useMockOutgoings as useOutgoings } from "../api/outgoings/outgoings-api-hooks";

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

  const {
    outgoings,
    createOutgoing,
    deleteOutgoing,
    // updateOutgoing,
  } = useOutgoings();

  const onNavigate = (navigateToTitle) => setSelectedNav(navigateToTitle);

  let view;

  switch (selectedNav) {
    case "My Flow": {
      view = <Outgoings outgoings={outgoings} />;
      break;
    }
    case "Subscriptions": {
      view = (
        <Subscriptions outgoings={outgoings} deleteOutgoing={deleteOutgoing} />
      );
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
    <div className="h-screen bg-white overflow-hidden flex">
      <Sidebar
        onNavigate={onNavigate}
        navLinks={navLinks}
        selectedNav={selectedNav}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className="flex-1 max-w-4xl mx-auto w-0 flex flex-col md:px-8 xl:px-0">
        <Header setMenuOpen={setMenuOpen} onNavigate={onNavigate} />
        <div className="flex h-full bg-gray-50 px-3 py-2 my-2 shadow-2xl rounded-lg">
          <main
            className="flex-1 relative overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            {view ? (
              <div className="py-6 space-y-3">
                <div className="px-4 sm:px-6 md:px-0 flex items-center justify-between ">
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
                    {selectedNav}
                  </h1>

                  <div className={`${createMode ? "invisible" : ""}`}>
                    <button
                      type="button"
                      onClick={() => setCreateMode(true)}
                      className="group inline-flex items-center mr-1 px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create
                    </button>
                  </div>
                </div>
                <div className="px-4 sm:px-6 md:px-0">{view}</div>
              </div>
            ) : (
              <div>Are You Lost?</div>
            )}
          </main>
          {createMode ? (
            <CreateSlideOver
              createOutgoing={createOutgoing}
              handleClose={() => setCreateMode(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
