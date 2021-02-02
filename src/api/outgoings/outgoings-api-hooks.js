import React from "react";
import * as outgoingsMockApi from "./outgoing-mock-api";
import * as outgoingsApi from "./outgoing-api";

export { useMockOutgoings, useOutgoings };

function useOutgoings() {
  return useOutgoingsForApi(outgoingsApi);
}

function useMockOutgoings() {
  return useOutgoingsForApi(outgoingsMockApi);
}

/* TODO: error-handling-use-outgoings */
/* TODO: render-outgoins-as-you-fetch */
function useOutgoingsForApi(api) {
  const [outgoings, setOutgoings] = React.useState([]);
  React.useEffect(() => {
    const outgoingsPromise = api.getAllOutgoings();
    outgoingsPromise.then(({ outgoings }) => setOutgoings(outgoings));
  }, [api, setOutgoings]);

  const createOutgoing = async (outgoing) => {
    return await api.createOutgoing(outgoing).then(({ createdOutgoing }) => {
      setOutgoings((outgoings) => [...outgoings, createdOutgoing]);
    });
  };

  const deleteOutgoing = async (id) => {
    return await api
      .deleteOutgoing(id)
      .then(({ deletedOutgoing }) =>
        setOutgoings((outgoings) =>
          outgoings.filter((outgoing) => outgoing.id !== deletedOutgoing.id)
        )
      );
  };

  const updateOutgoing = async (id, updates) => {
    return await api.updateOutgoing(id, updates).then(({ updatedOutgoing }) =>
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
}
