import React from "react";
import { useTransactions } from "../../api/transactions/transactions-api-hooks";
import { PageHeading, PageSubHeading, StatCard } from "../shared/components";

export const title = "My Flow";
export const iconSvgPath = (
  /* Heroicon name: home */
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  />
);

export function MyFlow({
  onCreateTransaction,
  onSelectTransaction,
  searchQuery,
}) {
  // Extract
  const { transactions } = useTransactions();

  // Transform

  const timelineTransactions = transactions.map(createTimelineTransaction);
  const filteredTimelineTransactions = timelineTransactions.filter(
    filterBySearchQuery(searchQuery)
  );
  const { left, received, spent } = calculateStats(
    filteredTimelineTransactions
  );
  const filteredTransactionsNewestFirst = filteredTimelineTransactions.sort(
    newestTransactionFirst
  );
  const [currentTransactions, upcomingTransactions] = splitTransactionsByDate({
    splitByDate: new Date(),
    transactions: filteredTransactionsNewestFirst,
  });

  const [showCurrent, toggleShowCurrent] = useToggle(true);
  const [showUpcoming, toggleShowUpcoming] = useToggle();

  // Load
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0 flex items-center justify-between ">
        <PageHeading title={title} />

        <button
          type="button"
          onClick={onCreateTransaction}
          className="group inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create
        </button>
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="space-y-3">
          <div className="space-y-1">
            <PageSubHeading title="Stats" />
            <div className="grid gap-3 sm:gap-5 grid-cols-3">
              <StatCard
                title="Received"
                number={received}
                bgColor="bg-gradient-to-t from-green-100 via-white to-white"
              />
              <StatCard title="Left" number={left} />
              <StatCard
                title="Spent"
                number={spent}
                bgColor="bg-gradient-to-t from-red-100 via-white to-white"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <PageSubHeading title="Timeline" />
            </div>
            <div className="flow-root space-y-3">
              <ToggleTransactions
                title={"Upcoming Transactions"}
                on={showUpcoming}
                onToggle={toggleShowUpcoming}
              >
                <ul className="border border-gray-300 p-1">
                  {upcomingTransactions?.map(
                    (timelineTransaction, index, array) => {
                      return (
                        <TimelineItem
                          key={timelineTransaction.id}
                          timelineTransaction={timelineTransaction}
                          isLast={index === array.length - 1}
                          onSelectTransaction={onSelectTransaction}
                        />
                      );
                    }
                  )}
                </ul>
              </ToggleTransactions>
              <ToggleTransactions
                title={"Current Transactions"}
                on={showCurrent}
                onToggle={toggleShowCurrent}
              >
                <ul>
                  {currentTransactions?.map(
                    (timelineTransaction, index, array) => {
                      return (
                        <TimelineItem
                          key={timelineTransaction.id}
                          timelineTransaction={timelineTransaction}
                          isLast={index === array.length - 1}
                          onSelectTransaction={onSelectTransaction}
                        />
                      );
                    }
                  )}
                </ul>
              </ToggleTransactions>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ timelineTransaction, isLast, onSelectTransaction }) {
  const {
    name,
    amountToShow,
    dueToShow,
    currencyToShow,
    due,
    id,
    isOutgoing,
    isFutureTransaction,
  } = timelineTransaction;
  return (
    <li>
      <div className={`relative ${isLast ? "" : "pb-8"}`}>
        {isLast ? null : (
          <span
            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        )}
        <div className="relative flex space-x-3">
          <div>
            {isOutgoing ? (
              <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-3 ring-white">
                {/* Heroicon name: trending-down */}
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : (
              <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                {/* Heroicon name: trending-up */}
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
            <div>
              <p className="text-sm text-gray-500">
                {`${isOutgoing ? "Spent" : "Received"} `}
                <span className="font-semibold text-gray-800">
                  <span className="font-normal">{currencyToShow}</span>
                  {amountToShow}
                </span>
                {` ${isOutgoing ? "on" : "from"} `}
                <button
                  onClick={() => onSelectTransaction(id)}
                  className="underline font-medium text-gray-900"
                >
                  {name}
                </button>
              </p>
            </div>
            <div className="text-right text-sm whitespace-nowrap text-gray-500">
              <time dateTime={due}>{dueToShow}</time>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function ToggleTransactions({ title, on, onToggle, children }) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="block text-gray-600 tracking-wide hover:text-gray-800 hover:underline"
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`${
            on ? "rotate-90" : ""
          } inline-block h-5 w-5 transform transition ease-in-out duration-200`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {on ? children : null}
    </>
  );
}

function createTimelineTransaction(transaction) {
  const { amount, due, direction, currency } = transaction;
  const isOutgoing = direction === "outgoing";
  // TODO: usable?
  const isFutureTransaction = new Date(due) > new Date();
  const dueToShow = getTimelineDate(due);
  const amountToShow = amount.toLocaleString();
  const currencyToShow =
    currency === "ILS" ? "₪" : currency === "USD" ? "$" : "?";
  return {
    ...transaction,
    isOutgoing,
    isFutureTransaction,
    dueToShow,
    amountToShow,
    currencyToShow,
  };
}

function filterBySearchQuery(query) {
  return function (timelineTransaction) {
    return getTimelineTransactionSearchableProps(
      timelineTransaction
    ).some((s) => s.toLowerCase().includes(query.toLowerCase()));
  };
}

function getTimelineTransactionSearchableProps({
  name,
  amountToShow,
  dueToShow,
  currencyToShow,
}) {
  return [name, amountToShow, currencyToShow, dueToShow];
}

function newestTransactionFirst(transactionA, transactionB) {
  if (transactionB.due === transactionA.due) {
    return (
      new Date(transactionB.created_at) - new Date(transactionA.created_at)
    );
  }
  return new Date(transactionB.due) - new Date(transactionA.due);
}

function splitTransactionsByDate({ splitByDate, transactions }) {
  const transactionsBefore = [];
  const transactionsAfter = [];
  transactions.forEach((transaction) => {
    new Date(transaction.due) <= splitByDate
      ? transactionsBefore.push(transaction)
      : transactionsAfter.push(transaction);
  });

  return [transactionsBefore, transactionsAfter];
}

function calculateStats(transactions) {
  let received = 0;
  let spent = 0;
  transactions.forEach(({ amount, direction }) => {
    if (direction === "outgoing") spent += amount;
    if (direction === "incoming") received += amount;
  });
  return { left: received - spent, received, spent };
}

function getTimelineDate(date) {
  const [, month, day] = new Date(date).toDateString().split(" ");
  return `${day} ${month}`;
}

function useToggle(initialValue = false) {
  // Returns the tuple [state, dispatch]
  // Normally with useReducer you pass a value to dispatch to indicate what action to
  // take on the state, but in this case there's only one action.
  return React.useReducer((state) => !state, initialValue);
}
