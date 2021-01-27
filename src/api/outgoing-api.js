import supabase from "./supabase";

export { getAllOutgoings, createOutgoing, deleteOutgoing, updateOutgoing };

async function getAllOutgoings() {
  let { data: outgoings, error } = await supabase.from("outgoings").select("*");

  return { outgoings, error };
}

async function createOutgoing(outgoing) {
  const user_id = supabase.auth.user().id;
  const { data, error } = await supabase.from("outgoings").insert([
    {
      ...outgoing,
      user_id,
    },
  ]);

  if (error) {
    console.error(error);
    return { error };
  }

  return { createdOutgoing: data[0] };
}

async function deleteOutgoing(id) {
  const { data, error } = await supabase
    .from("outgoings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return { error };
  }

  return { deletedOutgoing: data[0] };
}

async function updateOutgoing(id, updates) {
  const { data, error } = await supabase
    .from("outgoings")
    .update(updates)
    .eq("id", id);

  return { updatedOutgoing: data[0], error };
}
