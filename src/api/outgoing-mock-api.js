import { v4 as uuidv4 } from "uuid";

export { getAllOutgoings, createOutgoing, deleteOutgoing, updateOutgoing };

const DELAY_MS = 300;
const error = null;

let outgoings = [
  {
    id: uuidv4(),
    name: "iCloud",
    amount: 11.9,
    currency: "ILS",
    repeat: "Monthly",
    due: "2021-02-01",
  },
  {
    id: uuidv4(),
    name: "Primoosh",
    amount: 225,
    currency: "ILS",
    repeat: "One Time",
    due: "2021-01-26",
  },
];

/* TODO: error-handling */
async function getAllOutgoings() {
  await delay(DELAY_MS);
  return { outgoings, error };
}

async function createOutgoing(outgoing) {
  await delay(DELAY_MS);
  const createdOutgoing = { ...outgoing, id: uuidv4() };
  outgoings = [...outgoings, createdOutgoing];

  return { createdOutgoing };
}

async function deleteOutgoing(id) {
  await delay(DELAY_MS);
  const deletedOutgoing = outgoings.find((outgoing) => outgoing.id === id);
  outgoings = outgoings.filter((outgoing) => outgoing.id !== id);

  return { deletedOutgoing };
}

async function updateOutgoing(id, updates) {
  await delay(DELAY_MS);
  let updatedOutgoing;
  outgoings = outgoings.map((outgoing) => {
    if (outgoing.id === id) {
      updatedOutgoing = { ...outgoing, ...updates };
      outgoing = updatedOutgoing;
    }
    return outgoing;
  });
  return { updatedOutgoing };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
