import React from "react";
import { useOutsideAlerter } from "../../hooks/hooks";
import { useTransactions } from "../../api/transactions/transactions-api-hooks";

export { Subscriptions };

function Subscriptions({
  onCreateTransaction,
  onSelectSubscription,
  searchQuery,
}) {
  const { transactions, deleteTransaction } = useTransactions();
  const [optionsOpenItemId, setOptionsOpenItemId] = React.useState(null);

  const [normalizeAmountBy, setNormalizeAmountBy] = React.useState("monthly");

  // TODO: refactor this hack
  const [
    { sortBy, sortTypeNextDue, sortTypePrice },
    setSubscriptionSort,
  ] = React.useState({
    sortBy: "nextDue",
    sortTypeNextDue: "ASC",
    sortTypePrice: "ASC",
  });
  const handleSortChange = (nextSortBy) => {
    if (nextSortBy === sortBy) {
      if (nextSortBy === "nextDue") {
        setSubscriptionSort(({ sortBy, sortTypeNextDue, sortTypePrice }) => {
          return {
            sortBy,
            sortTypePrice,
            sortTypeNextDue: sortTypeNextDue === "ASC" ? "DESC" : "ASC",
          };
        });
      } else {
        setSubscriptionSort(({ sortBy, sortTypeNextDue, sortTypePrice }) => {
          return {
            sortBy,
            sortTypeNextDue,
            sortTypePrice: sortTypePrice === "ASC" ? "DESC" : "ASC",
          };
        });
      }
    }

    setSubscriptionSort(({ sortTypeNextDue, sortTypePrice }) => {
      return {
        sortBy: nextSortBy,
        sortTypeNextDue,
        sortTypePrice,
      };
    });
  };

  const subscriptions = transactions
    .filter(({ repeat, name, next }) => {
      const isSubscription = ["Monthly", "Annually"].includes(repeat);

      return isSubscription;
    })
    .map((subscription) => {
      return {
        ...subscription,
        nextDue: calculateNextDue(subscription),
        paidMonthly: calculatePaidMonthly(subscription),
        paidAnnually: calculatePaidAnnually(subscription),
      };
    })
    .filter(({ name, repeat, amount, nextDue, paidAnnually, paidMonthly }) => {
      const normalizedPriceView =
        normalizeAmountBy === "monthly" ? paidMonthly : paidAnnually;
      const matchesSearch =
        searchQuery === ""
          ? true
          : [name, repeat, amount, nextDue, normalizedPriceView].some((s) =>
              s.toString().toLowerCase().includes(searchQuery.toLowerCase())
            );
      return matchesSearch;
    });

  // TODO: also gotta refactor
  const sortedByDateSubscriptions = subscriptions.sort((a, b) => {
    if (sortBy === "nextDue") {
      if (sortTypeNextDue === "ASC") {
        return new Date(a.nextDue) - new Date(b.nextDue);
      } else {
        return new Date(b.nextDue) - new Date(a.nextDue);
      }
    } else {
      // using paidMonthly as the *normalized* amount for compare.
      if (sortTypePrice === "ASC") {
        return b.paidMonthly - a.paidMonthly;
      } else {
        return a.paidMonthly - b.paidMonthly;
      }
    }
  });

  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0 flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
          {/*TODO: duplication?*/}
          {/* {selectedNav} */}
          Subscriptions
        </h1>
        <div>
          <button
            type="button"
            onClick={onCreateTransaction}
            className="group inline-flex items-center mr-1 px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        {" "}
        <div className="space-y-3">
          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
            Stats
          </h2>
          <SubscriptionStats subscriptions={subscriptions} />
          <div className="flex justify-between items-center">
            <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
              Active
            </h2>
            <div>
              <div className="text-gray-700 text-sm flex justify-between">
                <span className="font-semibold">Show paid: </span>
                <button
                  onClick={() => setNormalizeAmountBy("monthly")}
                  className={`inline-block px-2 ${
                    normalizeAmountBy === "monthly"
                      ? "font-semibold text-pink-600"
                      : ""
                  }`}
                >
                  Monthly
                </button>
                {" | "}
                <button
                  onClick={() => setNormalizeAmountBy("annually")}
                  className={`inline-block px-2 ${
                    normalizeAmountBy === "annually"
                      ? "font-semibold text-pink-600"
                      : ""
                  }`}
                >
                  Annually
                </button>
              </div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Order By: </span>
                <button
                  onClick={() => handleSortChange("nextDue")}
                  className={`inline-block px-2 ${
                    sortBy === "nextDue" ? "font-semibold text-pink-600" : ""
                  }`}
                >
                  {sortTypeNextDue === "ASC" ? "▼" : "▲"} Next Due
                </button>
                {" | "}
                <button
                  onClick={() => handleSortChange("price")}
                  className={`inline-block px-2 ${
                    sortBy === "price" ? "font-semibold text-pink-600" : ""
                  }`}
                >
                  {sortTypePrice === "ASC" ? "▼" : "▲"} Price
                </button>
              </div>
            </div>
          </div>
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
            {sortedByDateSubscriptions.map((subscription) => (
              <SubscriptionItem
                key={subscription.id}
                subscription={subscription}
                normalizeAmountBy={normalizeAmountBy}
                optionsOpen={subscription.id === optionsOpenItemId}
                onOptionsClick={(selectedId) => {
                  const openedItemClicked = selectedId === optionsOpenItemId;
                  const clickedOutside = selectedId === undefined;
                  if (openedItemClicked || clickedOutside) {
                    setOptionsOpenItemId(null);
                    return;
                  }
                  setOptionsOpenItemId(selectedId);
                }}
                deleteTransaction={deleteTransaction}
                onSelectSubscription={onSelectSubscription}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SubscriptionItem({
  subscription,
  normalizeAmountBy,
  optionsOpen,
  onOptionsClick,
  deleteTransaction,
  onSelectSubscription,
}) {
  const {
    name,
    repeat,
    nextDue,
    id,
    currency,
    amount,
    paidAnnually,
    paidMonthly,
  } = subscription;
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
      {/*TODO: removed truncate class from the div below for the dropdown - did it break anything? */}
      <div className="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-md">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <p className="text-gray-900 font-medium hover:text-gray-600">
            {name}
          </p>
          <p className="text-gray-500 text-xs">{repeat}</p>
          <p className="text-gray-400 text-xs">
            Next billing date: {getSubscriptionDate(nextDue)}
          </p>
          <p className="text-gray-400 text-xs">
            <span className="font-normal">
              {currency === "ILS" ? "₪" : currency === "USD" ? "$" : "?"}
            </span>
            {amount.toLocaleString()} will be charged
          </p>
        </div>
        <div></div>
        <div className="mr-1">
          <span className="text-gray-700 font-semibold">
            <span className="font-normal">
              {/* TODO: support for usd view */}₪
            </span>
            {normalizeAmountBy === "monthly"
              ? paidMonthly.toFixed().toLocaleString()
              : paidAnnually.toFixed().toLocaleString()}
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
                  onClick={() => onSelectSubscription(id)}
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
                  onClick={() => deleteTransaction(id)}
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

function SubscriptionStats({ subscriptions }) {
  const { monthlyAverage, annuallyAverage } = calculateSubscriptionStats(
    subscriptions
  );

  return (
    <div>
      <dl className="mt-1 grid gap-3 sm:gap-5 grid-cols-2">
        <StatCard title="Monthly Average" number={monthlyAverage} />
        <StatCard title="Annually Average" number={annuallyAverage} />
      </dl>
    </div>
  );
}

function calculateSubscriptionStats(subscriptions) {
  let monthlyAverage = 0;
  let annuallyAverage = 0;

  subscriptions.forEach(({ paidMonthly, paidAnnually }) => {
    monthlyAverage += paidMonthly;
    annuallyAverage += paidAnnually;
  });

  return { monthlyAverage, annuallyAverage };
}

function getSubscriptionDate(date) {
  const [, month, day, year] = date.toDateString().split(" ");
  return `${day} ${month} ${year}`;
}

function calculateNextDue({ due, repeat }) {
  const startDueDate = new Date(due);
  if (startDueDate > new Date()) return startDueDate;

  const increment =
    repeat === "Monthly"
      ? (date) => {
          return new Date(date.setMonth(date.getMonth() + 1));
        }
      : (date) => {
          return new Date(date.setFullYear(date.getFullYear() + 1));
        };

  let nextDueDate = increment(startDueDate);
  while (nextDueDate < new Date()) {
    nextDueDate = increment(startDueDate);
  }

  return nextDueDate;
}

// TODO: fix the depandency graph, potential abstraction with myflow stat
function StatCard({ title, number, bgColor }) {
  return (
    <div
      className={`${
        bgColor === "green"
          ? `bg-gradient-to-t from-green-100 via-white`
          : bgColor === "red"
          ? `bg-gradient-to-t from-red-100 via-white`
          : "bg-white"
      } overflow-hidden shadow rounded-lg`}
    >
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
          {/* <span className="inline bg-red-100 rounded-full px-2 py-0.5 text-xs tracking-wide uppercase font-medium">
            <span className="text-red-700">{title}</span>
          </span> */}
          {title}
        </dt>
        <dd className="mt-1 text-lg sm:text-3xl font-semibold text-gray-900">
          {Math.round(number).toLocaleString()}
          <span className="font-normal">₪</span>
        </dd>
      </div>
    </div>
  );
}

const USDtoILSRate = 3.28; // Updated: Feb 08, 2021

// TODO: USD support
function calculatePaidMonthly({ amount, repeat, currency }) {
  const amountInILS = currency === "USD" ? amount * USDtoILSRate : amount;
  if (repeat === "Monthly") return amountInILS;
  return amountInILS / 12;
}

// TODO: USD support
function calculatePaidAnnually({ amount, repeat, currency }) {
  const amountInILS = currency === "USD" ? amount * USDtoILSRate : amount;
  if (repeat === "Annually") return amountInILS;
  return amountInILS * 12;
}
