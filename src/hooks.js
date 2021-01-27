import React from "react";
import * as outgoingsMockApi from "./api/outgoing-mock-api";
import * as outgoingsApi from "./api/outgoing-api";

const useMockOutgoings = createUseOutgoings(outgoingsMockApi);
const useOutgoings = createUseOutgoings(outgoingsApi);
export { useMockOutgoings, useOutgoings };

/* TODO: error-handling-use-outgoings */
/* TODO: render-outgoins-as-you-fetch */
function createUseOutgoings(api) {
  return function () {
    const [outgoings, setOutgoings] = React.useState([]);
    React.useEffect(() => {
      const outgoingsPromise = api.getAllOutgoings();
      outgoingsPromise.then(({ outgoings }) => setOutgoings(outgoings));
    }, [setOutgoings]);

    const createOutgoing = async (outgoing) => {
      await api
        .createOutgoing(outgoing)
        .then(({ createdOutgoing }) =>
          setOutgoings((outgoings) => [...outgoings, createdOutgoing])
        );
    };

    const deleteOutgoing = async (id) => {
      await api
        .deleteOutgoing(id)
        .then(({ deletedOutgoing }) =>
          setOutgoings((outgoings) =>
            outgoings.filter((outgoing) => outgoing.id !== deletedOutgoing.id)
          )
        );
    };

    const updateOutgoing = async (id, updates) => {
      await api.updateOutgoing(id, updates).then(({ updatedOutgoing }) =>
        setOutgoings(
          outgoings.map((outgoing) => {
            if (outgoing.id === updatedOutgoing.id) {
              outgoing = updatedOutgoing;
            }
            return outgoing;
          })
        )
      );
    };

    return { outgoings, createOutgoing, deleteOutgoing, updateOutgoing };
  };
}

// function useMockOutgoings() {
//   const [outgoings, setOutgoings] = React.useState([]);
//   React.useEffect(() => {
//     const outgoingsPromise = outgoingsMockApi.getAllOutgoings();
//     outgoingsPromise.then(({ outgoings }) => setOutgoings(outgoings));
//   }, [setOutgoings]);

//   const createOutgoing = async (outgoing) => {
//     await outgoingsMockApi
//       .createOutgoing(outgoing)
//       .then(({ outgoings }) => setOutgoings(outgoings));
//   };

//   const deleteOutgoing = async (id) => {
//     await outgoingsMockApi
//       .deleteOutgoing(id)
//       .then(({ outgoings }) => setOutgoings(outgoings));
//   };

//   const updateOutgoing = async (id, updates) => {
//     await outgoingsMockApi
//       .updateOutgoing(id, updates)
//       .then(({ outgoings }) => setOutgoings(outgoings));
//   };

//   return { outgoings, createOutgoing, deleteOutgoing, updateOutgoing };
// }
