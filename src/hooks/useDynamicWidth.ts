import isEmpty from "lodash.isempty";
import { useLayoutEffect } from "react";
import { IUseDynamicWidthProps } from "../types";
import { getMaxHeight, getMinWidth, getNums } from "../util";

const overrideDisplay = ["block", "none"];
const overrideFlex = ["none", "row", "row-reverse"];
const overrideWrap = ["none", "nowrap"];

const columnDirs = ["column", "column-reverse"];
const wrapDirs = ["wrap", "wrap-reverse"];

const useDynamicWidth = ({
  containerRef,
  constantHeight,
  constantWidth,
  dependencies = [],
}: IUseDynamicWidthProps) => {
  const children: HTMLDivElement[] = containerRef
    ? Array.from(containerRef.current?.children || [])
    : [];

  return useLayoutEffect(() => {
    if (!!containerRef) {
      let { display, flexDirection, flexWrap, maxHeight } =
        window.getComputedStyle(containerRef.current);
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
        !isEmpty(containerRef.current?.children)
      ) {
        const maxHeightPx = maxHeight.endsWith("px")
          ? getNums(maxHeight, 2)
          : getMaxHeight(containerRef, maxHeight);
        const minWidth = getMinWidth(
          containerRef,
          maxHeightPx,
          constantHeight,
          constantWidth
        );
        containerRef.current.style.display = display;
        containerRef.current.style.flexDirection = flexDirection;
        containerRef.current.style.flexWrap = flexWrap;
        containerRef.current.style.width = `${minWidth}px`;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, children.length, ...dependencies]);
};

export default useDynamicWidth;
