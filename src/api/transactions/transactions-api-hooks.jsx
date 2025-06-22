import React from "react";
import * as transactionsApi from "./transactions-api";
import { useErrorBoundary } from "react-error-boundary";

export { TransactionsProvider, useTransactions };

const TransactionsContext = React.createContext();
TransactionsContext.displayName = "TransactionsContext";

function TransactionsProvider(props) {
  return TransactionsProviderForApi({ api: transactionsApi, ...props });
}

function TransactionsProviderForApi({ api, ...props }) {
  const [{ transactions, error }, setTransactionsState] = React.useState({
    transactions: null,
    error: null,
  });

  const { showBoundary } = useErrorBoundary();

  React.useEffect(() => {
    if (error) {
      showBoundary(error);
    }
  }, [error, showBoundary]);

  const handleError = (error) => {
    setTransactionsState({ error, transactions: null });
  };
  React.useEffect(() => {
    api
      .getAllTransactions()
      .then(({ transactions, error }) => {
        if (error) {
          handleError(error);
        } else {
          setTransactionsState({ transactions, error: null });
        }
      })
      .catch(handleError);
  }, [api, setTransactionsState]);

  const createTransaction = async (transaction) => {
    try {
      const { createdTransaction, error } = await api.createTransaction(
        transaction
      );
      if (error) {
        handleError(error);
      } else {
        setTransactionsState(({ transactions }) => ({
          transactions: [...transactions, createdTransaction],
          error: null,
        }));
      }
    } catch (error) {
      handleError(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const { deletedTransaction, error } = await api.deleteTransaction(id);
      if (error) {
        handleError(error);
      } else {
        setTransactionsState(({ transactions }) => ({
          transactions: transactions.filter(
            (transaction) => transaction.id !== deletedTransaction.id
          ),
          error: null,
        }));
      }
    } catch (error) {
      handleError(error);
    }
  };

  const updateTransaction = async (id, updates) => {
    try {
      const { updatedTransaction, error } = await api.updateTransaction(
        id,
        updates
      );
      if (error) {
        handleError(error);
      } else {
        setTransactionsState(({ transactions }) => ({
          transactions: transactions.map((transaction) => {
            if (transaction.id === updatedTransaction.id) {
              transaction = updatedTransaction;
            }
            return transaction;
          }),
          error: null,
        }));
      }
    } catch (error) {
      handleError(error);
    }
  };

  const value = {
    transactions,
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
