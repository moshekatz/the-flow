import React from "react";
import { useTransactions } from "../../api/transactions/transactions-api-hooks";
import {
  PageHeading,
  PageSubHeading,
  Accordion,
  StatCard,
  SkeletonStatCard,
  categoryToColorMap,
  Dropdown,
  SkeletonDropdown,
  PrimaryButton,
} from "../shared/components";
import {
  calculateLeftReceivedSpent,
  calculateTimelineTransactionsForPeriod,
  todayAsFilterMonth,
  nextMonthAsFilterMonth,
  lastMonthAsFilterMonth,
} from "../shared/calculation-utils";

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
  onSelectTransaction,
  searchQuery,
  onCreateTransaction,
}) {
  const { loading, transactions } = useTransactions();

  if (loading) {
    return (
      <div className="py-3 space-y-3">
        <div className="px-4 sm:px-6 lg:px-0 flex justify-between items-center">
          <PageHeading title={title} />
          <SkeletonDropdown placeholderText="This Month" />
        </div>
        <div className="px-4 sm:px-6 lg:px-0">
          <div className="space-y-3">
            <div className="space-y-3">
              <PageSubHeading title="Stats" />
              <div className="grid grid-cols-3 gap-3 sm:gap-5">
                <SkeletonStatCard />
                <SkeletonStatCard />
                <SkeletonStatCard />
              </div>
            </div>
            <div className="space-y-3">
              <PageSubHeading title="Timeline" />
              <div className="flow-root space-y-3">
                <Accordion title={"Upcoming Transactions"}></Accordion>
                <Accordion title={"Transactions"} isOn={true}>
                  <ul className="p-1">
                    {[1, 2, 3, 4].map((_, index, array) => {
                      return (
                        <SkeletonTimelineItem
                          key={index}
                          isLast={index === array.length - 1}
                        />
                      );
                    })}
                  </ul>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return <MyFlowEmpty onCreateTransaction={onCreateTransaction} />;
  }

  return (
    <MyFlowDetails
      transactions={transactions}
      onSelectTransaction={onSelectTransaction}
      searchQuery={searchQuery}
    />
  );
}

const periods = {
  THIS_MONTH: {
    key: "THIS_MONTH",
    title: "This Month",
    value: todayAsFilterMonth,
  },
  LAST_MONTH: {
    key: "LAST_MONTH",
    title: "Last Month",
    value: lastMonthAsFilterMonth,
  },
  NEXT_MONTH: {
    key: "NEXT_MONTH",
    title: "Next Month",
    value: nextMonthAsFilterMonth,
  },
  EVERYTHING: {
    key: "EVERYTHING",
    title: "Everything",
    value: '01-01-2000',
  }
};

function MyFlowDetails({ transactions, onSelectTransaction, searchQuery }) {
  const [filteredPeriodKey, setFilteredPeriodKey] = React.useState(
    periods.THIS_MONTH.key
  );
  const {
    selectedOptionValue: filterMonth,
    filterOptions,
  } = React.useMemo(() => {
    const { value } = periods[filteredPeriodKey];
    const filterOptions = Object.values(periods).map(({ key, title }) => {
      return { title, key, isSelected: key === filteredPeriodKey };
    });
    return { selectedOptionValue: value, filterOptions };
  }, [filteredPeriodKey]);
  // Transform
  let transactionsForPeriod = transactions;
  if(filterMonth !== '01-01-2000') {
      transactionsForPeriod = calculateTimelineTransactionsForPeriod(
        transactions,
        filterMonth
      );
  }
  const timelineTransactions = transactionsForPeriod.map(
    createTimelineTransaction
  );

  const filteredTimelineTransactions = timelineTransactions.filter(
    filterBySearchQuery(searchQuery)
  );

  const { left, received, spent } = calculateLeftReceivedSpent(
    filteredTimelineTransactions
  );
  const filteredTransactionsNewestFirst = filteredTimelineTransactions.sort(
    newestTransactionFirst
  );
  const today = new Date();
  const [currentTransactions, upcomingTransactions] = splitTransactionsByDate({
    splitByDate: today,
    filterMonth,
    transactions: filteredTransactionsNewestFirst,
  });

  const budgetPerCategory = {};
  filteredTimelineTransactions.forEach(({ direction, amount, category }) => {
    if(direction === 'outgoing') {
      budgetPerCategory[category] = budgetPerCategory[category] ? budgetPerCategory[category] + amount : amount;
    }
  });

  // Load
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0 flex justify-between items-center">
        <PageHeading title={title} />
        <Dropdown
          dropdownOptions={filterOptions}
          onOptionSelected={(key) => {
            setFilteredPeriodKey(key);
          }}
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="space-y-8">
          <div className="space-y-3">
            <PageSubHeading title="Stats" />
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
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
          <PageSubHeading title="Expenses by category" />
          <div className="space-y-3">
            {
            Object.entries(budgetPerCategory)
              .sort(([_a, categoryBudgetA], [_b, categoryBudgetB]) => categoryBudgetB - categoryBudgetA)
              .map(([category, categoryBudget]) => <div><b>{category}:</b> {categoryBudget}</div>)
            }
          </div>
        </div>

          <div className="space-y-3">
            <PageSubHeading title="Timeline" />
            <div className="flow-root space-y-3">
              {upcomingTransactions &&
                (upcomingTransactions.length === 0 ? (
                  <div className="text-gray-600 tracking-wide">
                    No upcoming transactions this month.
                  </div>
                ) : (
                  <Accordion title={"Upcoming Transactions"}>
                    <ul className="border border-gray-300 p-1">
                      {upcomingTransactions.map(
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
                  </Accordion>
                ))}
              <Accordion title={"Transactions"} isOn={true}>
                <ul className="p-1">
                  {currentTransactions.map(
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
              </Accordion>
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
    due,
    id,
    isOutgoing,
    category,
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
              <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-3 ring-white">
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
                {/* {`${isOutgoing ? "Spent" : "Received"} `} */}
                <span className="font-semibold text-gray-800">
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
            <div className="space-x-1 flex flex-col-reverse sm:block text-right text-sm whitespace-nowrap text-gray-500">
              {category ? (
                <span className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-xs md:text-sm">
                  <span className="absolute flex-shrink-0 flex items-center justify-center">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${categoryToColorMap[category]}`}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-3.5 font-medium text-gray-900">
                    {category}
                  </span>
                </span>
              ) : null}
              <time dateTime={due}>{dueToShow}</time>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function SkeletonTimelineItem({ isLast }) {
  return (
    <li>
      <div className={`relative ${isLast ? "" : "pb-8"}`}>
        {isLast ? null : (
          <span
            className="animate-pulse absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        )}
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-3 ring-white"></span>
          </div>
          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
            <div>
              <div className="animate-pulse h-5 w-28 bg-gray-200"></div>
            </div>
            <div className="animate-pulse h-5 w-12 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </li>
  );
}

function MyFlowEmpty({ onCreateTransaction }) {
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0">
        <PageHeading title={title} />
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="space-y-3">
          <PageSubHeading title="No Transaction Added Yet" />
          <p className="text-gray-600">
            Tap "Create" button below to add your first transaction and start
            the flow!
          </p>
          <PrimaryButton onClick={onCreateTransaction}>Create</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function createTimelineTransaction(transaction) {
  const { amount, due, direction, currency } = transaction;
  const isOutgoing = direction === "outgoing";
  const dueToShow = getTimelineDate(due);
  const currencyToShow =
    currency === "ILS" ? "₪" : currency === "USD" ? "$" : "?";
  const amountToShow = `${currencyToShow}${amount.toLocaleString()}`;
  return {
    ...transaction,
    isOutgoing,
    dueToShow,
    amountToShow,
  };
}

function filterBySearchQuery(query) {
  return function (timelineTransaction) {
    return getTimelineTransactionSearchableProps(
      timelineTransaction
    ).some((s) => s?.toLowerCase().includes(query.toLowerCase()));
  };
}

function getTimelineTransactionSearchableProps({
  name,
  amountToShow,
  dueToShow,
  category,
}) {
  return [name, amountToShow, dueToShow, category];
}

function newestTransactionFirst(transactionA, transactionB) {
  if (transactionB.due === transactionA.due) {
    return (
      new Date(transactionB.created_at) - new Date(transactionA.created_at)
    );
  }
  return new Date(transactionB.due) - new Date(transactionA.due);
}

function splitTransactionsByDate({ splitByDate, filterMonth, transactions }) {
  const showEverything = !filterMonth;
  if (!(filterMonth === todayAsFilterMonth || showEverything))
    return [transactions];
  const transactionsBefore = [];
  const transactionsAfter = [];
  transactions.forEach((transaction) => {
    new Date(transaction.due) <= splitByDate
      ? transactionsBefore.push(transaction)
      : transactionsAfter.push(transaction);
  });

  return [transactionsBefore, transactionsAfter];
}

function getTimelineDate(date) {
  const [, month, day] = new Date(date).toDateString().split(" ");
  return `${day} ${month}`;
}
