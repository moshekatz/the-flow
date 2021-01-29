import React from "react";
import { useOutgoings } from "../hooks";
// import { useMockOutgoings as useOutgoings } from "../hooks";
import { useAuth } from "../auth-context";

export default TailwindOutgoings;

// function Outgoings() {
//   const {
//     outgoings,
//     createOutgoing,
//     deleteOutgoing,
//     updateOutgoing,
//   } = useOutgoings();

//   const handleCreate = async (outgoing) => await createOutgoing(outgoing);
//   const handleDelete = async (id) => await deleteOutgoing(id);
//   const handleMELECH = async (id) =>
//     await updateOutgoing(id, {
//       name: "MELECH",
//       amount: 100,
//       due: new Date("2021-01-26"),
//     });

//   const newOutgoingFormProps = {
//     elements: [
//       { type: "text", name: "name" },
//       { type: "number", name: "amount" },
//       { type: "text", name: "currency" } /* TODO: should be option*/,
//       { type: "text", name: "repeat" } /* TODO: should be option*/,
//       { type: "date", name: "due" },
//       { type: "date", name: "due end" },
//       { type: "submit", name: "Add Outgoing" },
//     ],
//     onSubmit: handleCreate,
//   };

//   return (
//     <>
//       <h3>New Outgoing?</h3>
//       <Form {...newOutgoingFormProps} />
//       <h2>Outgoings</h2>
//       <ul
//         style={{
//           listStyle: "none",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "baseline",
//           gap: "8px",
//         }}
//       >
//         {outgoings.map(({ id, name, amount, due }) => (
//           <li key={id}>
//             <button onClick={() => handleDelete(id)}>X</button>
//             {`  ${name} - ${amount} - ${new Date(due)}  `}
//             <button onClick={() => handleMELECH(id)}>
//               Change Me To MELECH
//             </button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

function TailwindOutgoings() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div>
      <div className="h-screen bg-white overflow-hidden flex">
        <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className="flex-1 max-w-4xl mx-auto w-0 flex flex-col md:px-8 xl:px-0">
          <Header setMenuOpen={setMenuOpen} />

          <main
            className="flex-1 relative overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            <OutgoingsContent />
          </main>
        </div>
      </div>
    </div>
  );
}

function OutgoingsContent() {
  const {
    outgoings,
    // createOutgoing,
    // deleteOutgoing,
    // updateOutgoing,
  } = useOutgoings();
  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Outgoins</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-0">
        <div>
          {/* <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Pinned Projects
          </h2> */}
          {/* <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"> */}
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-7">
            {outgoings.map((outgoing) => (
              <OutgoingItem outgoing={outgoing} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function OutgoingItem({ outgoing }) {
  const { name, amount, repeat, due } = outgoing;
  return (
    <li className="col-span-1 flex shadow-sm rounded-md">
      <div className="flex-shrink-0 flex items-center justify-center w-16 bg-red-600 text-white text-sm font-medium rounded-l-md">
        {amount}
      </div>
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <a href="/" className="text-gray-900 font-medium hover:text-gray-600">
            {name}
          </a>
          <p className="text-gray-500">{due}</p>
        </div>
        <div>
          <span class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
            {repeat}
          </span>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Open options</span>
            {/* Heroicon name: dots-vertical */}
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

function SideBar({ menuOpen, setMenuOpen }) {
  return (
    <>
      <div className={`md:hidden ${menuOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 z-40 flex">
          {/* TODO: Animations
  Off-canvas menu overlay, show/hide based on off-canvas menu state.

  Entering: "transition-opacity ease-linear duration-300"
    From: "opacity-0"
    To: "opacity-100"
  Leaving: "transition-opacity ease-linear duration-300"
    From: "opacity-100"
    To: "opacity-0"
*/}
          <div
            className={`fixed inset-0 ${menuOpen ? "" : "hidden"}`}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75" />
          </div>
          {/* TODO: Animations
  Off-canvas menu, show/hide based on off-canvas menu state.

  Entering: "transition ease-in-out duration-300 transform"
    From: "-translate-x-full"
    To: "translate-x-0"
  Leaving: "transition ease-in-out duration-300 transform"
    From: "translate-x-0"
    To: "-translate-x-full"
*/}
          <div
            className={`${
              menuOpen ? "" : "hidden"
            } relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
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
            </div>
            <div className="flex-shrink-0 px-4 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {/* Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                <a
                  href="/"
                  className="bg-gray-100 text-gray-900 group rounded-md py-2 px-2 flex items-center text-base font-medium"
                >
                  {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
                  {/* Heroicon name: home */}
                  <svg
                    className="text-gray-500 mr-4 h-6 w-6"
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Outgoings
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-base font-medium"
                >
                  {/* Heroicon name: users */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Team
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-base font-medium"
                >
                  {/* Heroicon name: folder */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Projects
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-base font-medium"
                >
                  {/* Heroicon name: calendar */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Calendar
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-base font-medium"
                >
                  {/* Heroicon name: inbox */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  Documents
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-base font-medium"
                >
                  {/* Heroicon name: chart-bar */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Reports
                </a>
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </div>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 flex flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
            <div className="flex-shrink-0 px-4 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="flex-grow mt-5 flex flex-col">
              <nav className="flex-1 bg-white px-2 space-y-1">
                {/* Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                <a
                  href="/"
                  className="bg-gray-100 text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                >
                  {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
                  {/* Heroicon name: home */}
                  <svg
                    className="text-gray-500 mr-3 h-6 w-6"
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Outgoings
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                >
                  {/* Heroicon name: users */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Team
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                >
                  {/* Heroicon name: folder */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Projects
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                >
                  {/* Heroicon name: calendar */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Calendar
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                >
                  {/* Heroicon name: inbox */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  Documents
                </a>
                <a
                  href="/"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                >
                  {/* Heroicon name: chart-bar */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Reports
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Header({ setMenuOpen }) {
  const { logout } = useAuth();
  // TODO: handle-error
  // const [error, setError] = React.useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const handleLogOut = async () => {
    await logout();
    // if (error) {
    //   setError(error);
    // }
  };

  return (
    <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
      <button
        onClick={() => setMenuOpen(true)}
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
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
      <div className="flex-1 flex justify-between px-4 md:px-0">
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
        <div className="ml-4 flex items-center md:ml-6">
          <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">View notifications</span>
            {/* Heroicon name: bell */}
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <div>
              <button
                onClick={() => setProfileDropdownOpen((isOpen) => !isOpen)}
                className="max-w-xs p-2 flex items-center text-sm rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="user-menu"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                MK
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
              <a
                href="/"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Your Profile
              </a>
              <a
                href="/"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Settings
              </a>
              <button
                // href="/"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => handleLogOut()}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
