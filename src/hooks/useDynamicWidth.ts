import isEmpty from "lodash.isempty";
import { MutableRefObject, useLayoutEffect } from "react";
import { getMaxHeight, getMinWidth } from "../util";

interface IUseDynamicWidthProps {
  containerRef: MutableRefObject<any>;
  dependencies?: any[];
}

const overrideDisplay = ["block", "none"];
const overrideFlex = ["none", "row", "row-reverse"];
const overrideWrap = ["none", "nowrap"];

const columnDirs = ["column", "column-reverse"];
const wrapDirs = ["wrap", "wrap-reverse"];

const useDynamicWidth = ({
  containerRef,
  dependencies = [],
}: IUseDynamicWidthProps) => {
  const children: HTMLDivElement[] = containerRef
    ? Array.from(containerRef.current?.children || [])
    : [];

  return useLayoutEffect(() => {
    if (!!containerRef) {
      const windowStyle = window.getComputedStyle(containerRef.current);
      let { display, flexDirection, flexWrap, maxHeight } = windowStyle;
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
          ? Number(maxHeight.slice(0, maxHeight.length - 2))
          : getMaxHeight(maxHeight, containerRef);
        const minWidth = getMinWidth(containerRef, maxHeightPx);
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
