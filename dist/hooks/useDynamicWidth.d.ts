import { IUseDynamicWidthProps } from "../types";
/**
 * Custom hook using useEffect or useLayoutEffect (when window is defined) to
 * calculate minimum required width of element and set the following CSS properties:
 *
 * `display: flex`
 *
 * `flex-direction: column` or column-reverse if specified via styles or a css class
 *
 * `flex-wrap: wrap` or wrap-reverse if specified via styles or a css class
 */
declare const useDynamicWidth: ({ columnRef, columnReverse, wrapReverse, maxHeight, constantHeight, constantWidth, dependencies, }: IUseDynamicWidthProps) => void;
export default useDynamicWidth;
