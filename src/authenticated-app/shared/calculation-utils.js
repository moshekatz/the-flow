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
