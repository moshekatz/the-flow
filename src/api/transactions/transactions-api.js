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
  const { data, error } = await supabase
    .from(table)
    .insert([
      {
        ...transaction,
        user_id,
      },
    ])
    .single();

  if (error) {
    console.error(error);
    return { error };
  }

  return { createdTransaction: data };
}

async function deleteTransaction(id) {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return { error };
  }

  return { deletedTransaction: data };
}

async function updateTransaction(id, updates) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id)
    .single();

  return { updatedTransaction: data, error };
}
