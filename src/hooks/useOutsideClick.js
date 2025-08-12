"use client";

import { useEffect, useRef } from "react";

function useOutsideClick(handeler, listenCapturing = true) {
  const ref = useRef();

  // use a sideeffect :
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handeler();
      }
    }
    // if clicked outside of modal : close the modal
    document.addEventListener("click", handleClick, listenCapturing);

    // cleanup :
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handeler, listenCapturing]);

  return ref;
}

export default useOutsideClick;

// listenCapturing = true : اینو ترو میزاریم ک مشکلات احتمالی روبرامون ایجاد نکنه
