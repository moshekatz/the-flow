import { v4 as uuidv4 } from "uuid";

export {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};

const DELAY_MS = 300;
const error = null;

let transactions = [
  {
    id: uuidv4(),
    name: "Primoosh",
    amount: 225,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-26",
    direction: "outgoing",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Salary",
    amount: 7000,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-01",
    direction: "incoming",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "iCloud",
    amount: 11.9,
    currency: "ILS",
    repeat: "Monthly",
    due: "2021-02-01",
    direction: "outgoing",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Primoosh",
    amount: 225,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-26",
    direction: "outgoing",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Salary",
    amount: 7000,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-01",
    direction: "incoming",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "iCloud",
    amount: 11.9,
    currency: "ILS",
    repeat: "Monthly",
    due: "2021-02-01",
    direction: "outgoing",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Primoosh",
    amount: 225,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-26",
    direction: "outgoing",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Salary",
    amount: 7000,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-01",
    direction: "incoming",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "iCloud",
    amount: 11.9,
    currency: "ILS",
    repeat: "Monthly",
    due: "2021-02-01",
    direction: "outgoing",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Primoosh",
    amount: 225,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-26",
    direction: "outgoing",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Salary",
    amount: 7000,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-01",
    direction: "incoming",
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "iCloud",
    amount: 11.9,
    currency: "ILS",
    repeat: "Monthly",
    due: "2021-02-01",
    direction: "outgoing",
    created_at: new Date(),
  },
];

async function getAllTransactions() {
  await delay(DELAY_MS);
  return { transactions, error };
}

async function createTransaction(transaction) {
  await delay(DELAY_MS);
  const createdTransaction = {
    ...transaction,
    id: uuidv4(),
    created_at: new Date(),
  };
  transactions = [...transactions, createdTransaction];

  return { createdTransaction };
}

async function deleteTransaction(id) {
  await delay(DELAY_MS);
  const deletedTransaction = transactions.find(
    (transaction) => transaction.id === id
  );
  transactions = transactions.filter((transaction) => transaction.id !== id);

  return { deletedTransaction };
}

async function updateTransaction(id, updates) {
  await delay(DELAY_MS);
  let updatedTransaction;
  transactions = transactions.map((transaction) => {
    if (transaction.id === id) {
      updatedTransaction = { ...transaction, ...updates };
      transaction = updatedTransaction;
    }
    return transaction;
  });
  return { updatedTransaction };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
