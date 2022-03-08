/**
 * Returns a number proxy for window size, changes on window resize.
 * Uses singletonHook from react-singleton-hook so that the proxy can be referenced multiple times without re-calculation.
 *
 * @param on boolean
 * @return proxy number for window size
 */
export declare const useWindowDimensionsImpl: () => number;
declare const useWindowDimensions: () => number;
export default useWindowDimensions;
