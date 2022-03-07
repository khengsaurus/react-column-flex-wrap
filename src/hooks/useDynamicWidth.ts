import isEmpty from "lodash.isempty";
import { useLayoutEffect } from "react";
import { IUseDynamicWidthProps } from "../types";
import { getMinWidth } from "../util";
import useWindowDimensions from "./useWindowDimensions";

const wrapDirs = ["wrap", "wrap-reverse"];
const columnDirs = ["column", "column-reverse"];
const overrideWrap = ["none", "nowrap"];
const overrideFlex = ["none", "row", "row-reverse"];
const overrideDisplay = ["none", "inline", "block", "inline-block"];

/**
 * Custom hook using useLayoutEffect to calculate minimum required width of element and set the following CSS properties:
 *
 * `display: flex`
 *
 * `flex-direction: column` or column-reverse if specified via styles or a css class
 *
 * `flex-wrap: wrap` or wrap-reverse if specified via styles or a css class
 */
const useDynamicWidth = ({
  columnRef,
  constantHeight,
  constantWidth,
  dependencies = [],
}: IUseDynamicWidthProps) => {
  /**
   * Proxy ref to detect changes in window dimensions
   */
  const windowRef = useWindowDimensions();
  const children: HTMLDivElement[] = columnRef
    ? Array.from(columnRef.current?.children || [])
    : [];

  return useLayoutEffect(() => {
    if (!!columnRef) {
      let { display, flexDirection, flexWrap } = window.getComputedStyle(
        columnRef.current
      );
      if (!display || overrideDisplay.includes(display)) {
        display = "flex";
      }
      if (!flexDirection || overrideFlex.includes(flexDirection)) {
        flexDirection = "column";
      }
      if (!flexWrap || overrideWrap.includes(flexWrap)) {
        flexWrap = "wrap";
      }

      if (
        display === "flex" &&
        wrapDirs.includes(flexWrap) &&
        columnDirs.includes(flexDirection) &&
        !isEmpty(columnRef.current?.children)
      ) {
        const minWidth = getMinWidth(columnRef, constantHeight, constantWidth);
        columnRef.current.style.display = display;
        columnRef.current.style.flexDirection = flexDirection;
        columnRef.current.style.flexWrap = flexWrap;
        columnRef.current.style.width = `${minWidth}px`;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnRef, children.length, windowRef, ...dependencies]);
};

export default useDynamicWidth;
