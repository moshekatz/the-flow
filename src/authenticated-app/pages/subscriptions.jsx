import React from "react";
import { useTransactions } from "../../api/transactions/transactions-api-hooks";
import { PageHeading, PageSubHeading, StatCard } from "../shared/components";
import {
  calculateSubscriptionStats,
  calculateNextDue,
  calculatePaidMonthly,
  calculatePaidAnnually,
} from "../shared/calculation-utils";

export const title = "Subscriptions";
export const iconSvgPath = (
  /* Heroicon name: refresh */
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  />
);

export function Subscriptions({
  onCreateTransaction,
  onSelectSubscription,
  searchQuery,
}) {
  // Load
  const {
    isAmountNormalizedByMonth,
    isAmountNormalizedByYear,
    normalizeAmountByMonth,
    normalizeAmountByYear,
  } = useNormalizedAmountBy();

  const {
    isSortByNextDue,
    isSortByAmount,
    isSortByNextDueASC,
    isSortByAmountASC,
    sortByNextDue,
    sortByAmount,
  } = useSortByNextDueAndAmount();

  const { transactions } = useTransactions();

  // Transform
  const subscriptions = transactions
    .filter(isSubscription)
    .map(createSubscriptionNormalizedBy(isAmountNormalizedByMonth));

  const filteredSubscriptions = subscriptions.filter(
    filterBySearchQuery(searchQuery)
  );

  const { monthlyAverage, annuallyAverage } = calculateSubscriptionStats(
    filteredSubscriptions
  );

  const sortedFilteredSubscriptions = filteredSubscriptions.sort(
    sortSubscriptions({
      isSortByNextDue,
      isSortByAmount,
      isSortByNextDueASC,
      isSortByAmountASC,
    })
  );

  // Load
  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0 flex items-center justify-between ">
        <PageHeading title={title} />
        <div>
          <button
            type="button"
            onClick={onCreateTransaction}
            className="group inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 hover:bg-gray-50 hover:border-blue-700 focus:bg-gray-50 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="space-y-3">
          <PageSubHeading title="Stats" />
          <div className="grid gap-3 sm:gap-5 grid-cols-2">
            <StatCard title="Monthly Average" number={monthlyAverage} />
            <StatCard title="Annually Average" number={annuallyAverage} />
          </div>
          <div className="flex justify-between items-center space-y-3">
            <PageSubHeading title="Active" />
            <div>
              <div className="text-gray-700 text-sm flex justify-between">
                <span className="font-semibold">Show paid: </span>
                <button
                  onClick={normalizeAmountByMonth}
                  className={`inline-block px-2 ${
                    isAmountNormalizedByMonth
                      ? "font-semibold text-pink-600"
                      : ""
                  }`}
                >
                  Monthly
                </button>
                {" | "}
                <button
                  onClick={normalizeAmountByYear}
                  className={`inline-block px-2 ${
                    isAmountNormalizedByYear
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
                  onClick={sortByNextDue}
                  className={`inline-block px-2 ${
                    isSortByNextDue ? "font-semibold text-pink-600" : ""
                  }`}
                >
                  {isSortByNextDueASC ? "▼" : "▲"} Next Due
                </button>
                {" | "}
                <button
                  onClick={sortByAmount}
                  className={`inline-block px-2 ${
                    isSortByAmount ? "font-semibold text-pink-600" : ""
                  }`}
                >
                  {isSortByAmountASC ? "▼" : "▲"} Amount
                </button>
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:gap-6">
            {sortedFilteredSubscriptions.map((subscription) => (
              <SubscriptionItem
                key={subscription.id}
                subscription={subscription}
                onSelectSubscription={onSelectSubscription}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SubscriptionItem({ subscription, onSelectSubscription }) {
  const {
    id,
    name,
    repeat,
    amountToShow,
    nextDueToShow,
    normalizedAmountToShow,
  } = subscription;
  return (
    <li className="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded px-4 py-2 shadow-sm">
      <div className="flex-1 text-sm truncate">
        <button
          className="text-gray-900 font-medium hover:text-pink-600"
          onClick={() => onSelectSubscription(id)}
        >
          {name}
        </button>
        <p className="text-gray-500 text-xs">{repeat}</p>
        <p className="text-gray-400 text-xs">
          Next billing date: {nextDueToShow}
        </p>
        <p className="text-gray-400 text-xs">{amountToShow} will be charged</p>
      </div>
      <div>
        <span className="text-gray-700 text-xl">
          {/* TODO: support for usd view */}
          {normalizedAmountToShow}
        </span>
      </div>
    </li>
  );
}

function getSubscriptionDateToShow(date) {
  const [, month, day, year] = date.toDateString().split(" ");
  return `${day} ${month} ${year}`;
}

function createSubscriptionNormalizedBy(isAmountNormalizedByMonth) {
  return function (transaction) {
    const { due, repeat, amount, currency } = transaction;
    const nextDue = calculateNextDue({ due, repeat });
    const paidMonthly = calculatePaidMonthly({ amount, repeat, currency });
    const paidAnnually = calculatePaidAnnually({ amount, repeat, currency });
    return {
      ...transaction,
      nextDue,
      paidMonthly,
      paidAnnually,
      nextDueToShow: getSubscriptionDateToShow(nextDue),
      amountToShow: getSubscriptionAmountToShow({ amount, currency }),
      normalizedAmountToShow: getSubscriptionNormalizetAmountToShow({
        isAmountNormalizedByMonth,
        paidAnnually,
        paidMonthly,
      }),
    };
  };
}

function getSubscriptionAmountToShow({ amount, currency }) {
  const currencyToShow =
    currency === "ILS" ? "₪" : currency === "USD" ? "$" : "?";
  const amountToShow = `${currencyToShow}${amount.toLocaleString()}`;
  return amountToShow;
}

function getSubscriptionNormalizetAmountToShow({
  isAmountNormalizedByMonth,
  paidAnnually,
  paidMonthly,
}) {
  const currencyToShow = "₪";
  const normalizeAmount = isAmountNormalizedByMonth
    ? paidMonthly
    : paidAnnually;
  const normalizedAmountToShow = `${currencyToShow}${normalizeAmount
    .toFixed()
    .toLocaleString()}`;
  return normalizedAmountToShow;
}

function filterBySearchQuery(query) {
  return function (timelineTransaction) {
    return getSubscriptionSearchableProps(timelineTransaction).some((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );
  };
}

function getSubscriptionSearchableProps({
  name,
  repeat,
  nextDueToShow,
  amountToShow,
  normalizedAmountToShow,
}) {
  return [name, repeat, nextDueToShow, amountToShow, normalizedAmountToShow];
}

function isSubscription(transaction) {
  const { repeat } = transaction;
  return ["Monthly", "Annually"].includes(repeat);
}

function sortSubscriptions({
  isSortByNextDue,
  isSortByAmount,
  isSortByNextDueASC,
  isSortByAmountASC,
}) {
  return function (subscriptionA, subscriptionB) {
    if (isSortByNextDue) {
      const nextDueA = new Date(subscriptionA.nextDue);
      const nextDueB = new Date(subscriptionB.nextDue);
      if (isSortByNextDueASC) {
        return nextDueA - nextDueB;
      } else {
        return nextDueB - nextDueA;
      }
    }

    if (isSortByAmount) {
      // Default to paidMonthly as the normalized amount for comparison (could use paidAnnually as well).
      if (isSortByAmountASC) {
        return subscriptionB.paidMonthly - subscriptionA.paidMonthly;
      } else {
        return subscriptionA.paidMonthly - subscriptionB.paidMonthly;
      }
    }

    throw new Error(
      "This should not be possible - unsupported subscriptions sort."
    );
  };
}

function useNormalizedAmountBy() {
  const MONTH = "month";
  const YEAR = "year";
  const [normalizeAmountBy, setNormalizeAmountBy] = React.useState(MONTH);
  const isAmountNormalizedByMonth = normalizeAmountBy === MONTH;
  const isAmountNormalizedByYear = normalizeAmountBy === YEAR;
  const normalizeAmountByMonth = () => setNormalizeAmountBy(MONTH);
  const normalizeAmountByYear = () => setNormalizeAmountBy(YEAR);

  return {
    isAmountNormalizedByMonth,
    isAmountNormalizedByYear,
    normalizeAmountByMonth,
    normalizeAmountByYear,
  };
}

function useSortByNextDueAndAmount() {
  const NEXT_DUE = "NEXT_DUE";
  const AMOUNT = "AMOUNT";
  const [
    { sortBy, isSortByNextDueASC, isSortByAmountASC },
    setSubscriptionSort,
  ] = React.useState({
    sortBy: NEXT_DUE,
    isSortByNextDueASC: true,
    isSortByAmountASC: true,
  });
  const isSortByNextDue = sortBy === NEXT_DUE;
  const isSortByAmount = sortBy === AMOUNT;
  const sortByNextDue = () =>
    setSubscriptionSort(({ sortBy, isSortByNextDueASC, isSortByAmountASC }) => {
      const isSortByNextDue = sortBy === NEXT_DUE;
      return {
        sortBy: NEXT_DUE,
        isSortByAmountASC,
        isSortByNextDueASC: isSortByNextDue
          ? !isSortByNextDueASC
          : isSortByNextDueASC,
      };
    });
  const sortByAmount = () =>
    setSubscriptionSort(({ sortBy, isSortByNextDueASC, isSortByAmountASC }) => {
      const isSortByAmount = sortBy === AMOUNT;
      return {
        sortBy: AMOUNT,
        isSortByNextDueASC,
        isSortByAmountASC: isSortByAmount
          ? !isSortByAmountASC
          : isSortByAmountASC,
      };
    });

  return {
    isSortByNextDue,
    isSortByAmount,
    isSortByNextDueASC,
    isSortByAmountASC,
    sortByNextDue,
    sortByAmount,
  };
}
