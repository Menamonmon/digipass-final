import { RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<any>, onClick: () => void) => {
  const handler = (event: Event) => {
    if (ref.current && event.target && !ref.current.contains(event.target)) {
      onClick();
    }
  };
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handler, true);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handler, true);
    };
  }, [ref]);
};
