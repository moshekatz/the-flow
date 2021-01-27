import { useOutgoings } from "../hooks";
// import { useMockOutgoings as useOutgoings } from "../hooks";
import { Form } from "../components";

export default Outgoings;

function Outgoings() {
  const {
    outgoings,
    createOutgoing,
    deleteOutgoing,
    updateOutgoing,
  } = useOutgoings();

  const handleCreate = async (outgoing) => await createOutgoing(outgoing);
  const handleDelete = async (id) => await deleteOutgoing(id);
  const handleMELECH = async (id) =>
    await updateOutgoing(id, {
      name: "MELECH",
      amount: 100,
      due: new Date("2021-01-26"),
    });

  const newOutgoingFormProps = {
    elements: [
      { type: "text", name: "name" },
      { type: "number", name: "amount" },
      { type: "text", name: "currency" } /* TODO: should be option*/,
      { type: "text", name: "repeat" } /* TODO: should be option*/,
      { type: "date", name: "due" },
      { type: "date", name: "due end" },
      { type: "submit", name: "Add Outgoing" },
    ],
    onSubmit: handleCreate,
  };

  return (
    <>
      <h3>New Outgoing?</h3>
      <Form {...newOutgoingFormProps} />
      <h2>Outgoings</h2>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          gap: "8px",
        }}
      >
        {outgoings.map(({ id, name, amount, due }) => (
          <li key={id}>
            <button onClick={() => handleDelete(id)}>X</button>
            {`  ${name} - ${amount} - ${new Date(due)}  `}
            <button onClick={() => handleMELECH(id)}>
              Change Me To MELECH
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
