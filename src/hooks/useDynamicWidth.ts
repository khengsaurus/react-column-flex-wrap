import isEmpty from "lodash.isempty";
import { useLayoutEffect } from "react";
import { IUseDynamicWidthProps } from "../types";
import { getMaxHeight, getMinWidth } from "../util";

const overrideDisplay = ["none", "inline", "block", "inline-block"];
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
      let { display, flexDirection, flexWrap, height, maxHeight } =
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
        const maxHeightPx = getMaxHeight(
          containerRef,
          maxHeight === "none" || !maxHeight ? height : maxHeight
        );
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
