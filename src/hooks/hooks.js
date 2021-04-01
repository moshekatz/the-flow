import React from "react";

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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, excludeRef]);
}
