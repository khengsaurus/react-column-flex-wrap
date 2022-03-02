import { MutableRefObject } from "react";

export function getMaxHeight(
  maxHeight: string,
  elementRef: MutableRefObject<any>
): number {
  if (maxHeight.endsWith("%")) {
    const parentNode = elementRef.current.parentNode;
    const { height } = window.getComputedStyle(parentNode);
    const parentHeight = Number(height.slice(0, height.length - 2));
    const percentage = Number(maxHeight.slice(0, maxHeight.length - 1));
    return (parentHeight * percentage) / 100;
  } else {
    // vh and vw will be converted to px in some browsers
    const units = Number(maxHeight.slice(0, maxHeight.length - 2));
    const heightStringLength = maxHeight.length - 2;
    if (maxHeight.indexOf("vh") === heightStringLength) {
      return (units * window.innerHeight) / 100;
    }
    if (maxHeight.indexOf("vw") === heightStringLength) {
      return (units * window.innerWidth) / 100;
    }
    return 0;
  }
}

export function getFullHeightWidth(child: HTMLDivElement) {
  const styles = window.getComputedStyle(child);
  const height =
    child.offsetHeight +
    parseFloat(styles["marginTop"]) +
    parseFloat(styles["marginBottom"]);
  const width =
    child.offsetWidth +
    parseFloat(styles["marginLeft"]) +
    parseFloat(styles["marginRight"]);
  return { height: Math.ceil(height), width: Math.ceil(width) };
  // return { height: 100, width: 100 };
}

export function getMinWidth(ref: MutableRefObject<any>, maxHeight: number) {
  const children: HTMLDivElement[] = [].slice.call(ref.current?.children);
  let colHeight = 0;
  let colMaxWidth = 0;
  let reqWidth = 0;
  children.forEach((child: HTMLDivElement) => {
    const { height, width } = getFullHeightWidth(child);
    const heightWithEle = colHeight + height;
    if (heightWithEle > maxHeight) {
      // add new column if exceeded maxHeight
      reqWidth += colMaxWidth;
      colHeight = height;
      colMaxWidth = width;
    } else {
      // increase current column height, update column width
      colHeight = heightWithEle;
      if (width > colMaxWidth) {
        reqWidth += width - colMaxWidth;
        colMaxWidth = width;
      }
    }
  });
  return reqWidth;
}
