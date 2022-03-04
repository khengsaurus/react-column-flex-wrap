import React, { useCallback, useEffect, useRef } from "react";

/**
 * Hook to listen to window resize
 * @param on boolean
 * @return number which changes on window resize
 */
const useWindowDimensions = (on = true) => {
  const windowRef = useRef(0);

  const handleResize = useCallback(
    () => (windowRef.current = window.innerHeight + 100 * window.innerWidth),
    []
  );

  useEffect(() => {
    if (on) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (on) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [handleResize, on]);

  return windowRef.current;
};

export default useWindowDimensions;
