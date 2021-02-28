import React from "react";
import { PageHeading, PageSubHeading } from "../shared/components";
import { useTransactions } from "../../api/transactions/transactions-api-hooks";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import {
  calculateTimelineTransactionsForPeriod,
  calculateLeftReceivedSpent,
  calculateYearAndMonth,
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

export function Dashboard() {
  const { error, loading, transactions } = useTransactions();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const filterMonths = ["2021-01-01", "2021-02-01", "2021-03-01"];

  return (
    <div className="py-3 space-y-3">
      <div className="px-4 sm:px-6 lg:px-0">
        <PageHeading
          title={`${title} - ${filterMonths
            .map(calculateYearAndMonth)
            .join(", ")}`}
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="space-y-3">
          <PageSubHeading title="Incoming vs. Outgoing" />
          <IncomingVsOutgoing
            transactions={transactions}
            filterMonths={filterMonths}
          />
          <PageSubHeading title="Outgoing by Category" />
          <OutgoingByCategory
            transactions={transactions}
            filterMonths={filterMonths}
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
          margin={{ top: 40, bottom: 40, left: 40 }}
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
          margin={{ top: 50, bottom: 50, left: 80, right: 80 }}
          animate={true}
          sliceLabelsSkipAngle={15}
          innerRadius={0.5}
          radialLabelsSkipAngle={10}
        />
      </div>
    </div>
  );
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
