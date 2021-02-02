import React from "react";

// TODO: might want to refactor - especiaaly the "excludeRef" thing
export function useOutsideAlerter(ref, callback, { excludeRef } = {}) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (!ref?.current?.contains(event.target)) {
        if (!excludeRef?.current?.contains(event.target)) {
          callback();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, excludeRef]);
}
