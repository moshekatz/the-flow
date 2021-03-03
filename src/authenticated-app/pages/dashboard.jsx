import React from "react";
import { PageHeading, PageSubHeading, Dropdown } from "../shared/components";
import { useTransactions } from "../../api/transactions/transactions-api-hooks";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import {
  calculateTimelineTransactionsForPeriod,
  calculateLeftReceivedSpent,
  calculateYearAndMonth,
  calculateLastXMonthsAsFilterMonths,
  todayAsFilterMonth,
  nextMonthAsFilterMonth,
} from "../shared/calculation-utils";

export const title = "Dashboard";
export const iconSvgPath = (
  /* Heroicon name: chart-bar */
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  />
);

export function Dashboard({ searchQuery }) {
  const { loading, transactions } = useTransactions();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardDetails transactions={transactions} searchQuery={searchQuery} />
  );
}

const periods = {
  LAST_3_MONTHS: {
    key: "LAST_3_MONTHS",
    title: "Last 3 Months",
    value: calculateLastXMonthsAsFilterMonths(3),
  },
  LAST_6_MONTHS: {
    key: "LAST_6_MONTHS",
    title: "Last 6 Months",
    value: calculateLastXMonthsAsFilterMonths(6),
  },
  LAST_12_MONTHS: {
    key: "LAST_12_MONTHS",
    title: "Last 12 Months",
    value: calculateLastXMonthsAsFilterMonths(12),
  },
  THIS_MONTH: {
    key: "THIS_MONTH",
    title: "This Month",
    value: [todayAsFilterMonth],
  },
  NEXT_MONTH: {
    key: "NEXT_MONTH",
    title: "Next Month",
    value: [nextMonthAsFilterMonth],
  },
};

function DashboardDetails({ transactions, searchQuery }) {
  const [filteredPeriodKey, setFilteredPeriodKey] = React.useState(
    periods.LAST_3_MONTHS.key
  );
  const { selectedOptionValue, filterOptions } = React.useMemo(() => {
    const { value } = periods[filteredPeriodKey];
    const filterOptions = Object.values(periods).map(({ key, title }) => {
      return { title, key, isSelected: key === filteredPeriodKey };
    });
    return { selectedOptionValue: value, filterOptions };
  }, [filteredPeriodKey]);

  const filteredTransactions = transactions.filter(
    filterBySearchQuery(searchQuery)
  );

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
        <div className="space-y-3">
          <PageSubHeading title="Incoming vs. Outgoing" />
          <IncomingVsOutgoing
            transactions={filteredTransactions}
            filterMonths={selectedOptionValue}
          />
          <PageSubHeading title="Outgoing by Category" />
          <OutgoingByCategory
            transactions={filteredTransactions}
            filterMonths={selectedOptionValue}
          />
        </div>
      </div>
    </div>
  );
}

function IncomingVsOutgoing({ transactions, filterMonths }) {
  const data = calculateIncomingVsOutgoingVisualizationsData({
    transactions,
    filterMonths,
  });

  return (
    // <div className="h-80 bg-gradient-to-t from-yellow-500 to-yellow-700"></div>
    <div className="relative h-80">
      <div className="absolute w-full h-full">
        <ResponsiveBar
          data={data}
          indexBy="month"
          keys={["incoming", "outgoing"]}
          groupMode="grouped"
          defs={[
            {
              id: "red-gradient",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#F87171" },
                { offset: 100, color: "#EF4444" },
              ],
            },
            {
              id: "green-gradient",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#34D399" },
                { offset: 100, color: "#10B981" },
              ],
            },
          ]}
          fill={[
            { match: { id: "outgoing" }, id: "red-gradient" },
            { match: { id: "incoming" }, id: "green-gradient" },
          ]}
          margin={{ top: 5, bottom: 30, left: 40 }}
          animate={true}
          isInteractive={false}
        />
      </div>
    </div>
  );
}

function OutgoingByCategory({ transactions, filterMonths }) {
  const data = calculateOutgoingByCategoryVisualizationsData({
    transactions,
    filterMonths,
  });
  const dataSortedByValue = data.sort((a, b) => b.value - a.value);
  return (
    // <div className="h-80 bg-gradient-to-t from-green-500 to-green-700"></div>
    <div className="relative h-96">
      <div className="absolute w-full h-full">
        <ResponsivePie
          data={dataSortedByValue}
          margin={{ top: 20, bottom: 30, left: 80, right: 80 }}
          animate={true}
          sliceLabelsSkipAngle={15}
          innerRadius={0.5}
          radialLabelsSkipAngle={10}
        />
      </div>
    </div>
  );
}

function filterBySearchQuery(query) {
  return function (transaction) {
    return getTransactionSearchableProps(transaction).some((s) =>
      s?.toLowerCase().includes(query.toLowerCase())
    );
  };
}

function getTransactionSearchableProps({ name, category }) {
  return [name, category];
}

function calculateIncomingVsOutgoingVisualizationsData({
  transactions,
  filterMonths,
}) {
  return filterMonths.map((filterMonth) => {
    const transactionsInFilterMonth = calculateTimelineTransactionsForPeriod(
      transactions,
      filterMonth
    );
    const { received, spent } = calculateLeftReceivedSpent(
      transactionsInFilterMonth
    );
    return {
      month: calculateYearAndMonth(filterMonth),
      outgoing: spent.toFixed(),
      incoming: received.toFixed(),
    };
  });
}

function calculateOutgoingByCategoryVisualizationsData({
  transactions,
  filterMonths,
}) {
  let transactionsInPeriod = [];
  filterMonths.forEach((filterMonth) => {
    const transactionsInFilterMonth = calculateTimelineTransactionsForPeriod(
      transactions,
      filterMonth
    );
    transactionsInPeriod = [
      ...transactionsInPeriod,
      ...transactionsInFilterMonth,
    ];
  });
  const outgoingTransactionsByCategory = transactionsInPeriod.reduce(
    (acc, { direction, category, amount }) => {
      if (direction === "incoming") return acc;
      if (acc[category]) {
        acc[category] += amount;
      } else {
        acc[category] = amount;
      }
      return acc;
    },
    {}
  );
  return Object.entries(outgoingTransactionsByCategory).map(
    ([category, sum]) => {
      return {
        id: category,
        label: category === null ? "None" : category,
        value: sum.toFixed(),
      };
    }
  );
}
