import React from "react";
import { useTransactions } from "../api/transactions/transactions-api-hooks";

export { TransactionSlideOver };

const todayAsInputValue = new Date().toISOString().split("T")[0];

const defaultTransaction = {
  name: "",
  direction: "outgoing",
  amount: "",
  currency: "ILS",
  repeat: "One Time",
  due: todayAsInputValue,
  due_end: null,
};

function TransactionSlideOver({ handleClose, transactionId }) {
  const {
    transactions,
    createTransaction,
    deleteTransaction,
    updateTransaction,
  } = useTransactions();

  // TODO: perf-optimization (getById? O(1) < O(n))
  const selectedTransaction = transactions.find(
    (transaction) => transaction.id === transactionId
  );

  const [name, setName] = React.useState(
    selectedTransaction?.name || defaultTransaction.name
  );
  const [direction, setDirection] = React.useState(
    selectedTransaction?.direction || defaultTransaction.direction
  );
  const [amount, setAmount] = React.useState(
    selectedTransaction?.amount || defaultTransaction.amount
  );
  const [currency, setCurrency] = React.useState(
    selectedTransaction?.currency || defaultTransaction.currency
  );
  const [repeat, setRepeat] = React.useState(
    selectedTransaction?.repeat || defaultTransaction.repeat
  );
  const [due, setDue] = React.useState(
    selectedTransaction?.due || defaultTransaction.due
  );
  const [dueEnd, setDueEnd] = React.useState(
    selectedTransaction?.due_end || defaultTransaction.due_end
  );

  const nameInputRef = React.useRef();
  React.useEffect(() => {
    if (!selectedTransaction) {
      nameInputRef.current.focus();
    }
  }, [selectedTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: upsert-transaction-support (hook exported method?)
    const shouldUpdate = transactionId !== null;
    if (shouldUpdate) {
      try {
        await updateTransaction(transactionId, {
          name,
          direction,
          amount,
          currency,
          repeat,
          due,
          due_end: dueEnd ? dueEnd : undefined,
        });
        handleClose();
        // TODO: error-handling
        // if (error) {
        //   alert(error.message);
        // }
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await createTransaction({
          name,
          direction,
          amount,
          currency,
          repeat,
          due,
          due_end: dueEnd ? dueEnd : undefined,
        });
        handleClose();
        // TODO: error-handling
        // if (error) {
        //   alert(error.message);
        // }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTransaction(transactionId);
      handleClose();
      // TODO: error-handling
      // if (error) {
      //   alert(error.message);
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-20">
      <div className={`fixed inset-0`} aria-hidden="true">
        <div className="absolute inset-0 bg-gray-600 opacity-75" />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <section
          className="absolute inset-y-0 right-0 max-w-full flex"
          aria-labelledby="slide-over-heading"
        >
          {/* TODO: animations-support
  Slide-over panel, show/hide based on slide-over state.

  Entering: "transform transition ease-in-out duration-500 sm:duration-700"
    From: "translate-x-full"
    To: "translate-x-0"
  Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
    From: "translate-x-0"
    To: "translate-x-full"
*/}
          <div className="w-screen sm:max-w-md">
            <div className="h-full flex flex-col py-6 bg-white shadow-xl">
              <div className="lg:mt-6 relative flex-1 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    id="slide-over-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    {transactionId ? name : "Create a new transaction"}
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={handleClose}
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Close panel</span>
                      {/* Heroicon name: x */}
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="min-h-0 flex-1 flex flex-col">
                    <div className="mt-6 relative flex-1 ">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <div className="mt-1">
                          <input
                            ref={nameInputRef}
                            type="text"
                            name="name"
                            id="name"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="pt-6 sm:pt-5">
                        <div role="group" aria-labelledby="label-direction">
                          <label
                            htmlFor="direction"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Direction
                          </label>

                          <div className="flex justify-around items-center mt-1">
                            <div className="flex items-center">
                              <input
                                checked={direction === "outgoing"}
                                onChange={(e) => setDirection(e.target.value)}
                                id="outgoing"
                                name="direction"
                                type="radio"
                                value="outgoing"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label
                                htmlFor="outgoing"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Outgoing
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                checked={direction === "incoming"}
                                onChange={(e) => setDirection(e.target.value)}
                                id="incoming"
                                name="direction"
                                type="radio"
                                value="incoming"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label
                                htmlFor="incoming"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Incoming
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 sm:pt-5">
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Amount
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm font-normal">
                              {currency === "ILS"
                                ? "₪"
                                : currency === "USD"
                                ? "$"
                                : "?"}
                            </span>
                          </div>
                          <input
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.valueAsNumber);
                            }}
                            type="number"
                            name="amount"
                            id="amount"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-16 sm:text-sm border-gray-300 rounded-md"
                            placeholder={0}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="currency" className="sr-only">
                              Currency
                            </label>
                            <select
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                              id="currency"
                              name="currency"
                              className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                            >
                              <option>ILS</option>
                              <option>USD</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 sm:pt-5">
                        <div role="group" aria-labelledby="label-repeat">
                          <label
                            htmlFor="repeat"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Repeat
                          </label>

                          <div className="flex justify-around items-center mt-1">
                            <div className="flex items-center">
                              <input
                                checked={repeat === "One Time"}
                                onChange={(e) => setRepeat(e.target.value)}
                                id="one-time"
                                name="repeat"
                                type="radio"
                                value="One Time"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label
                                htmlFor="one-time"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                One Time
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                checked={repeat === "Monthly"}
                                onChange={(e) => setRepeat(e.target.value)}
                                id="monthly"
                                name="repeat"
                                type="radio"
                                value="Monthly"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label
                                htmlFor="monthly"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Monthly
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                checked={repeat === "Annually"}
                                onChange={(e) => setRepeat(e.target.value)}
                                id="annually"
                                name="repeat"
                                type="radio"
                                value="Annually"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label
                                htmlFor="annually"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Annually
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 sm:pt-5">
                        <label
                          htmlFor="due"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Due
                        </label>
                        <div className="mt-1">
                          <input
                            value={due}
                            onChange={(e) => setDue(e.target.value)}
                            type="date"
                            name="due"
                            id="due"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {repeat !== "One Time" ? (
                        <div className="pt-6 sm:pt-5">
                          <label
                            htmlFor="due"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Due End{" "}
                            <span className="text-sm text-gray-400">
                              (optional)
                            </span>
                          </label>
                          <div className="mt-1">
                            <input
                              value={dueEnd}
                              onChange={(e) => setDueEnd(e.target.value)}
                              type="date"
                              name="dueEnd"
                              id="dueEnd"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className={`flex-shrink-0 py-4 flex ${
                      transactionId ? "justify-between" : "justify-end"
                    }`}
                  >
                    {transactionId ? (
                      <button
                        onClick={handleDelete}
                        type="button"
                        className="bg-white py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Delete
                      </button>
                    ) : null}
                    <button
                      type="submit"
                      className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
