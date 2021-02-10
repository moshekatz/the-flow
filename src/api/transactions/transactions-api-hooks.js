import React from "react";
import * as transactionsApi from "./transactions-api";
// import * as transactionsMockApi from "./transactions-mock-api";

export { TransactionsProvider, useTransactions };
// export { TransactionsMockProvider as TransactionsProvider, useTransactions };

const TransactionsContext = React.createContext();
TransactionsContext.displayName = "TransactionsContext";

function TransactionsProvider(props) {
  return TransactionsProviderForApi({ api: transactionsApi, ...props });
}

// function TransactionsMockProvider(props) {
//   return TransactionsProviderForApi({ api: transactionsMockApi, ...props });
// }

/* TODO: error-handling */
function TransactionsProviderForApi({ api, ...props }) {
  const [transactions, setTransactions] = React.useState([]);
  React.useEffect(() => {
    /* TODO: render-as-you-fetch */
    const transactionsPromise = api.getAllTransactions();
    transactionsPromise.then(({ transactions }) => {
      setTransactions(transactions);
    });
  }, [api, setTransactions]);

  const createTransaction = async (transaction) => {
    return await api
      .createTransaction(transaction)
      .then(({ createdTransaction }) => {
        setTransactions((transactions) => [
          ...transactions,
          createdTransaction,
        ]);
      });
  };

  const deleteTransaction = async (id) => {
    return await api
      .deleteTransaction(id)
      .then(({ deletedTransaction }) =>
        setTransactions((transactions) =>
          transactions.filter(
            (transaction) => transaction.id !== deletedTransaction.id
          )
        )
      );
  };

  const updateTransaction = async (id, updates) => {
    return await api
      .updateTransaction(id, updates)
      .then(({ updatedTransaction }) =>
        setTransactions(
          transactions.map((transaction) => {
            if (transaction.id === updatedTransaction.id) {
              transaction = updatedTransaction;
            }
            return transaction;
          })
        )
      );
  };

  const value = {
    transactions,
    createTransaction,
    deleteTransaction,
    updateTransaction,
  };

  return <TransactionsContext.Provider value={value} {...props} />;
}

function useTransactions() {
  const context = React.useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      `useTransactions must be used within a TransactionsProvider`
    );
  }
  return context;
}
