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
  const [{ transactions, error }, setTransactionsState] = React.useState({
    transactions: null,
    error: null,
  });
  const onError = (error) =>
    setTransactionsState({ error, transactions: null });
  React.useEffect(() => {
    /* TODO: render-as-you-fetch */
    const transactionsPromise = api.getAllTransactions();
    transactionsPromise
      .then(({ transactions, error }) => {
        setTransactionsState({ transactions, error });
      })
      .catch(onError);
  }, [api, setTransactionsState]);

  const createTransaction = async (transaction) => {
    try {
      const { createdTransaction, error } = await api.createTransaction(
        transaction
      );
      setTransactionsState(({ transactions }) => ({
        transactions: [...transactions, createdTransaction],
        error,
      }));
    } catch (error) {
      onError(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const { deletedTransaction, error } = await api.deleteTransaction(id);
      setTransactionsState(({ transactions }) => ({
        transactions: transactions.filter(
          (transaction) => transaction.id !== deletedTransaction.id
        ),
        error,
      }));
    } catch (error) {
      onError(error);
    }
  };

  const updateTransaction = async (id, updates) => {
    try {
      const { updatedTransaction, error } = await api.updateTransaction(
        id,
        updates
      );
      setTransactionsState(({ transactions }) => ({
        transactions: transactions.map((transaction) => {
          if (transaction.id === updatedTransaction.id) {
            transaction = updatedTransaction;
          }
          return transaction;
        }),
        error,
      }));
    } catch (error) {
      onError(error);
    }
  };

  const value = {
    transactions,
    error,
    loading: !transactions && !error,
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
