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
  const user_id = supabase.auth.user().id;
  const { data: createdTransaction, error } = await supabase
    .from(table)
    .insert([
      {
        ...transaction,
        user_id,
      },
    ])
    .single();

  return { createdTransaction, error };
}

async function deleteTransaction(id) {
  const { data: deletedTransaction, error } = await supabase
    .from(table)
    .delete()
    .eq("id", id)
    .single();

  return { deletedTransaction, error };
}

async function updateTransaction(id, updates) {
  const { data: updatedTransaction, error } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id)
    .single();

  return { updatedTransaction, error };
}
