import { supabase } from "../../supabase";
import useSWR from "swr";

export function useSWRTransactions() {
  const { data, error } = useSWR("/api/transactions", getAllTransactions);
  return {
    transactions: data,
    error,
    loading: !error && !data,
  };
}

async function getAllTransactions() {
  let { data, error } = await supabase.from("transactions").select("*");
  console.log({ data, error });
  if (error) throw error;

  return data;
}
