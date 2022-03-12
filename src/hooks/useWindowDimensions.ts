import { useCallback, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { useIsoEffect } from ".";

/**
 * Returns a number proxy for window size, changes on window resize.
 * Uses singletonHook from react-singleton-hook so that the proxy can be
 * referenced multiple times without re-calculation.
 *
 * @return proxy number for window size
 */
export const useWindowDimensionsImpl = () => {
  const [windowDimProxy, setWindowDimProxy] = useState(0);

  const handleResize = useCallback(() => {
    setWindowDimProxy(window.innerHeight + 1000 * window.innerWidth);
  }, []);

  useIsoEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return windowDimProxy;
};

const useWindowDimensions = singletonHook(0, useWindowDimensionsImpl);
export default useWindowDimensions;
