import { supabase } from "../../supabase";

export {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};

const table = "transactions";

async function getAllTransactions() {
  let { data: transactions, error } = await supabase.from(table).select("*");

  return { transactions, error };
}

async function createTransaction(transaction) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  if (!user_id) {
    return {
      createdTransaction: null,
      error: new Error("User not authenticated"),
    };
  }

  const { data: createdTransactions, error } = await supabase
    .from(table)
    .insert([
      {
        ...transaction,
        user_id,
      },
    ])
    .select();

  return { createdTransaction: createdTransactions?.[0], error };
}

async function deleteTransaction(id) {
  const { data: deletedTransactions, error } = await supabase
    .from(table)
    .delete()
    .eq("id", id)
    .select();

  return { deletedTransaction: deletedTransactions?.[0], error };
}

async function updateTransaction(id, updates) {
  const { data: updatedTransactions, error } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id)
    .select();

  return { updatedTransaction: updatedTransactions?.[0], error };
}
