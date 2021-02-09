import React from "react";
import { useTransactions } from "../../api/transactions/transactions-api-hooks";

export { MyFlow };

function MyFlow({ onCreateTransaction, onSelectTransaction, searchQuery }) {
  const { transactions } = useTransactions();
  const timelineTransactions = transactions.map((transaction) => {
    const { amount, due, direction } = transaction;
    const isOutgoing = direction === "outgoing";
    const isFutureTransaction = new Date(due) > new Date();
    const dueToShow = getTimelineDate(due);
    const amountToShow = amount.toLocaleString();
    return {
      ...transaction,
      isOutgoing,
      isFutureTransaction,
      dueToShow,
      amountToShow,
    };
  });
  const filteredTransactions = timelineTransactions.filter((transaction) => {
    if (searchQuery === "") return true;
    const { name, amountToShow, dueToShow } = transaction;

    return [name, amountToShow, dueToShow].some((s) =>
      s.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0 flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
          {/*TODO: duplication?*/}
          {/* {selectedNav} */}
          My Flow
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
        <div className="space-y-3">
          <MyFlowStats transactions={filteredTransactions} />
          <Timeline
            onSelectTransaction={onSelectTransaction}
            transactions={filteredTransactions}
          />
        </div>
      </div>
    </div>
  );
}

function MyFlowStats({ transactions }) {
  const { left, received, spent } = calculateStats(transactions);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
        Stats
      </h2>
      <div>
        <dl className="mt-1 grid gap-3 sm:gap-5 grid-cols-3">
          <StatCard title="Received" number={received} bgColor="green" />
          <StatCard title="Left" number={left} />
          <StatCard title="Spent" number={spent} bgColor="red" />
        </dl>
      </div>
    </div>
  );
}

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

function Timeline({ onSelectTransaction, transactions }) {
  const sortedByDateTransaction = transactions.sort((a, b) => {
    if (b.due === a.due) {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    return new Date(b.due) - new Date(a.due);
  });

  const [showUpcoming, toggleShowUpcoming] = useToggle();
  const filteredTransactions = sortedByDateTransaction.filter(({ due }) => {
    if (showUpcoming) return true;
    return new Date(due) <= new Date();
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
          Timeline
        </h2>
        <ToggleUpcoming on={showUpcoming} onToggle={toggleShowUpcoming} />
      </div>
      <div className="flow-root">
        <ul className="mt-3">
          {filteredTransactions?.map((transaction, index, array) => {
            return (
              <TimelineItem
                key={transaction.id}
                transaction={transaction}
                isLast={index === array.length - 1}
                onSelectTransaction={onSelectTransaction}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function TimelineItem({ transaction, isLast, onSelectTransaction }) {
  const {
    name,
    amountToShow,
    currency,
    due,
    id,
    isOutgoing,
    isFutureTransaction,
    dueToShow,
  } = transaction;
  return (
    <li>
      <div
        className={`relative pb-8 ${isFutureTransaction ? "bg-gray-100" : ""}`}
      >
        {isLast ? null : (
          <span
            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        )}
        <div className="relative flex space-x-3">
          <div>
            {isOutgoing ? (
              <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
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
                  <span className="font-normal">
                    {currency === "ILS" ? "₪" : currency === "USD" ? "$" : "?"}
                  </span>
                  {amountToShow}
                </span>{" "}
                {`${isOutgoing ? "on" : "from"} `}
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

function ToggleUpcoming({ on, onToggle }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="ml-3" id="annual-billing-label">
        <span className="text-sm font-medium text-gray-600">
          {on ? "Hide" : "Show"} Upcoming
        </span>
      </span>
      <button
        type="button"
        onClick={onToggle}
        className={`${
          on ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        aria-pressed="false"
        aria-labelledby="show-upcoming-label"
      >
        <span
          aria-hidden="true"
          className={`${
            on ? "translate-x-5" : "translate-x-0"
          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        />
      </button>
    </div>
  );
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
