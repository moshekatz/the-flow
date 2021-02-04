import { useTransactions } from "../../api/transactions/transactions-api-hooks";

export { MyFlow };

function MyFlow({ onSelectTransaction }) {
  return (
    <div className="space-y-3">
      <Stats />
      <Timeline onSelectTransaction={onSelectTransaction} />
    </div>
  );
}

function Stats() {
  const { transactions } = useTransactions();
  const { left, received, spent } = calculateStats(transactions);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
        Stats
      </h2>
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Left
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {left.toLocaleString()}
                <span className="font-serif">₪</span>
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Received
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {received.toLocaleString()}
                <span className="font-serif">₪</span>
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Spent
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {spent.toLocaleString()}
                <span className="font-serif">₪</span>
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Timeline({ onSelectTransaction }) {
  const { transactions } = useTransactions();
  const sortedByDateTransaction = transactions.sort(
    (a, b) => new Date(b.due) - new Date(a.due)
  );
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
        Timeline
      </h2>
      <div className="flow-root">
        <ul className="mt-3">
          {sortedByDateTransaction?.map((transaction, index, array) => {
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
  const { name, amount, currency, due, direction, id } = transaction;
  const isOutgoing = direction === "outgoing";
  return (
    <li>
      <div className="relative pb-8">
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
                  {amount}
                  <span className="font-serif">
                    {currency === "ILS" ? "₪" : currency === "USD" ? "$" : "?"}
                  </span>
                </span>{" "}
                {`${isOutgoing ? "on" : "from"} `}
                <button
                  onClick={() => onSelectTransaction(id)}
                  className="font-medium text-gray-900"
                >
                  {name}
                </button>
              </p>
            </div>
            <div className="text-right text-sm whitespace-nowrap text-gray-500">
              <time dateTime={due}>
                {new Date(due).toGMTString().split(" 00")[0]}
              </time>
            </div>
          </div>
        </div>
      </div>
    </li>
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
