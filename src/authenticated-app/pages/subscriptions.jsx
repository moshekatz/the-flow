import React from "react";
import { useOutsideAlerter } from "../../hooks/hooks";

export { Subscriptions };

function Subscriptions({ outgoings, deleteOutgoing }) {
  const [optionsOpenItemId, setOptionsOpenItemId] = React.useState(null);

  return (
    <div>
      {/* <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Pinned Projects
          </h2> */}
      {/* <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"> */}
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
        {outgoings.map((outgoing) => (
          <OutgoingItem
            key={outgoing.id}
            outgoing={outgoing}
            optionsOpen={outgoing.id === optionsOpenItemId}
            onOptionsClick={(selectedId) => {
              const openedItemClicked = selectedId === optionsOpenItemId;
              const clickedOutside = selectedId === undefined;
              if (openedItemClicked || clickedOutside) {
                setOptionsOpenItemId(null);
                return;
              }
              setOptionsOpenItemId(selectedId);
            }}
            deleteOutgoing={deleteOutgoing}
          />
        ))}
      </ul>
    </div>
  );
}

function OutgoingItem({
  outgoing,
  optionsOpen,
  onOptionsClick,
  deleteOutgoing,
}) {
  const { name, amount, repeat, due, id } = outgoing;
  const optionsDropdownRef = React.useRef();
  const optionsButtonRef = React.useRef();
  useOutsideAlerter(
    optionsDropdownRef,
    () => {
      if (optionsOpen) {
        onOptionsClick();
      }
    },
    { excludeRef: optionsButtonRef }
  );

  return (
    <li className="col-span-1 flex shadow-sm rounded-md">
      <div className="flex-shrink-0 flex items-center justify-center w-16 bg-red-600 text-white text-sm font-medium rounded-l-md">
        {amount}
      </div>
      {/*TODO: removed truncate class from the div below for the dropdown - did it break anything? */}
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <a href="/" className="text-gray-900 font-medium hover:text-gray-600">
            {name}
          </a>
          <p className="text-gray-500">{due}</p>
        </div>
        <div className="mr-1">
          <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
            {repeat}
          </span>
        </div>
        <div className="relative flex-shrink-0 pr-2">
          <button
            ref={optionsButtonRef}
            onClick={() => {
              onOptionsClick(id);
            }}
            className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
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
          {optionsOpen ? (
            <div
              ref={optionsDropdownRef}
              className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1">
                <button
                  className="w-full group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {/* Heroicon name: pencil-alt */}
                  <svg
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Edit
                </button>
              </div>
              <div className="py-1">
                <button
                  onClick={() => deleteOutgoing(id)}
                  className="w-full group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {/* Heroicon name: trash */}
                  <svg
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
