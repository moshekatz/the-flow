const USDtoILSRate = 3.28; // Updated: Feb 08, 2021

export function calculateMyFlowStats(transactions) {
  let received = 0;
  let spent = 0;
  transactions?.forEach(({ amount, direction, currency }) => {
    const amountInILS = currency === "USD" ? amount * USDtoILSRate : amount;
    if (direction === "outgoing") spent += amountInILS;
    if (direction === "incoming") received += amountInILS;
  });
  return { left: received - spent, received, spent };
}

export function calculateSubscriptionStats(subscriptions) {
  let monthlyAverage = 0;
  let annuallyAverage = 0;

  subscriptions.forEach(({ paidMonthly, paidAnnually }) => {
    monthlyAverage += paidMonthly;
    annuallyAverage += paidAnnually;
  });

  return { monthlyAverage, annuallyAverage };
}

export function calculatePaidMonthly({ amount, repeat, currency }) {
  const amountInILS = currency === "USD" ? amount * USDtoILSRate : amount;
  if (repeat === "Monthly") return amountInILS;
  return amountInILS / 12;
}

export function calculatePaidAnnually({ amount, repeat, currency }) {
  const amountInILS = currency === "USD" ? amount * USDtoILSRate : amount;
  if (repeat === "Annually") return amountInILS;
  return amountInILS * 12;
}

export function calculateNextDue({ due, repeat }) {
  const startDueDate = new Date(due);
  if (startDueDate > new Date()) return startDueDate;

  const increment =
    repeat === "Monthly"
      ? (date) => {
          return new Date(new Date(date).setMonth(date.getMonth() + 1));
        }
      : (date) => {
          return new Date(new Date(date).setFullYear(date.getFullYear() + 1));
        };

  let nextDueDate = startDueDate;
  while (nextDueDate < new Date()) {
    nextDueDate = increment(nextDueDate);
  }

  return nextDueDate;
}

export function calculateLastDue({ due, due_end, repeat }) {
  const startDueDate = new Date(due);
  const dueEnd = new Date(due_end);
  const increment =
    repeat === "Monthly"
      ? (date) => {
          return new Date(new Date(date).setMonth(date.getMonth() + 1));
        }
      : (date) => {
          return new Date(new Date(date).setFullYear(date.getFullYear() + 1));
        };
  let lastDueDate = startDueDate;
  while (increment(lastDueDate) < dueEnd) {
    lastDueDate = increment(lastDueDate);
  }

  return lastDueDate;
}

function CalculateTodayAsFilterMonth() {
  let today = new Date();
  const [thisMonthYear, thisMonthMonth] = today.toISOString().split("-");
  return `${thisMonthYear}-${thisMonthMonth}-01`;
}
export const todayAsFilterMonth = CalculateTodayAsFilterMonth();

export function calculateTimelineTransactionsForPeriod(
  timelineTransactions,
  filterMonth
) {
  const [
    oneTimeTransactions,
    monthlyTransactions,
    annuallyTransactions,
  ] = splitTransactionsByRepeat(timelineTransactions);

  const oneTimeTransactionsForPeriod = calculateOneTimeTransactionsForPeriod(
    oneTimeTransactions,
    filterMonth
  );
  const monthlyTransactionsForPeriod = calculateMonthlyTransactionsForPeriod(
    monthlyTransactions,
    filterMonth
  );
  const annuallyTransactionsForPeriod = calculateAnnuallyTransactionsForPeriod(
    annuallyTransactions,
    filterMonth
  );

  return [
    ...oneTimeTransactionsForPeriod,
    ...monthlyTransactionsForPeriod,
    ...annuallyTransactionsForPeriod,
  ];
}

function splitTransactionsByRepeat(transactions) {
  let oneTimeTransactions = [];
  let monthlyTransactions = [];
  let annuallyTransactions = [];

  transactions.forEach((transaction) => {
    if (transaction.repeat === "One Time") {
      oneTimeTransactions.push(transaction);
    } else if (transaction.repeat === "Monthly") {
      monthlyTransactions.push(transaction);
    } else if (transaction.repeat === "Annually") {
      annuallyTransactions.push(transaction);
    }
  });

  return [oneTimeTransactions, monthlyTransactions, annuallyTransactions];
}

function calculateOneTimeTransactionsForPeriod(
  oneTimeTransactions,
  filterMonth
) {
  const oneTimeTransactionsForPeriod = [];

  oneTimeTransactions.forEach((oneTimeTransaction) => {
    const transactionInPeriod =
      oneTimeTransaction.due.substring(0, 7) === filterMonth.substring(0, 7);
    if (transactionInPeriod) {
      oneTimeTransactionsForPeriod.push(oneTimeTransaction);
    }
  });

  return oneTimeTransactionsForPeriod;
}

function calculateMonthlyTransactionsForPeriod(
  monthlyTransactions,
  filterMonth
) {
  const monthlyTransactionsForPeriod = [];

  monthlyTransactions.forEach((monthlyTransaction) => {
    const transactionInPeriod = isMonthlyTransactionInPeriod(
      monthlyTransaction,
      filterMonth
    );
    if (transactionInPeriod) {
      const dueForPeriod = `${filterMonth.substring(
        0,
        7
      )}-${monthlyTransaction.due.substring(8, 10)}`;
      monthlyTransactionsForPeriod.push({
        ...monthlyTransaction,
        due: dueForPeriod,
      });
    }
  });

  return monthlyTransactionsForPeriod;
}

function isMonthlyTransactionInPeriod(monthlyTransaction, filterMonth) {
  const { due, due_end, repeat } = monthlyTransaction;
  const isStartsBeforeOrInTheFilteredMonth =
    new Date(due) <
    new Date(filterMonth).setMonth(new Date(filterMonth).getMonth() + 1);
  const isEndBeforeTheFilteredMonth = due_end
    ? calculateLastDue({ due, due_end, repeat }) < new Date(filterMonth)
    : false;

  return isStartsBeforeOrInTheFilteredMonth && !isEndBeforeTheFilteredMonth;
}

function calculateAnnuallyTransactionsForPeriod(
  annuallyTransactions,
  filterMonth
) {
  const annuallyTransactionsForPeriod = [];

  annuallyTransactions.forEach((annuallyTransaction) => {
    const transactionInPeriod = isAnnuallyTransactionInPeriod(
      annuallyTransaction,
      filterMonth
    );
    if (transactionInPeriod) {
      annuallyTransactionsForPeriod.push(annuallyTransaction);
    }
  });

  return annuallyTransactionsForPeriod;
}

function isAnnuallyTransactionInPeriod(annuallyTransaction, filterMonth) {
  const { due, due_end, repeat } = annuallyTransaction;

  const isInTheFilteredMonth =
    due.substring(5, 7) === filterMonth.substring(5, 7);
  const isStartsBeforeOrInTheFilteredMonth =
    Number(due.substring(0, 4)) <= Number(filterMonth.substring(0, 4));
  const isEndBeforeTheFilteredMonth = due_end
    ? calculateLastDue({ due, due_end, repeat }) < new Date(filterMonth)
    : false;

  return (
    isInTheFilteredMonth &&
    isStartsBeforeOrInTheFilteredMonth &&
    !isEndBeforeTheFilteredMonth
  );
}

export function calculateYearAndMonth(date) {
  const [, month, , year] = new Date(date).toDateString().split(" ");
  return `${month} ${year}`;
}
