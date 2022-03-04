import { MutableRefObject } from "react";
import { IHeightWidth } from "../types";

/**
 * @param rem: units in rem
 * @return value in px
 */
function remToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/**
 * @param str: height as string, with units
 * @param unitLength: length of the unit of str
 * @return numerical value of str without units
 */
export function getNums(str: string, unitLength: number): number {
  return Number(str.slice(0, str.length - unitLength)) || 0;
}

/**
 * @param ref React.MutableRefObject containing the node to calculate
 * @param maxHeight optional string value of the node's max-height, with or without units: '%' | 'px' | 'vh' | 'vw' | 'em' | 'rem'
 * @return maximum height in px, inclusive of margins, padding and borders
 */
export function getMaxHeight(
  ref: MutableRefObject<any>,
  maxHeight = ""
): number {
  let _maxH: string | number;

  /**
   * use maxHeight if provided or maxHeight or height from computed styles
   */
  if (maxHeight) {
    const _n = Number(maxHeight);
    if (_n > 0) {
      return _n;
    }
    _maxH = maxHeight;
  } else {
    let { height, maxHeight: _maxHeight } = window.getComputedStyle(
      ref.current
    );
    _maxH = _maxHeight === "none" || !_maxHeight ? height : maxHeight;
  }

  if (_maxH.endsWith("px")) {
    return getNums(_maxH, 2);
  } else if (_maxH.endsWith("%")) {
    /**
     * Calculate height as percentage of parent element's height
     */
    const { height: parentHeight = "0" } = window.getComputedStyle(
      ref.current.parentNode
    );
    const percentage = getNums(_maxH, 1);
    return (
      (Number(parentHeight.slice(0, parentHeight.length - 2)) * percentage) /
      100
    );
  } else if (_maxH.endsWith("em")) {
    const fontSize = parseFloat(getComputedStyle(ref.current).fontSize) || 0;
    const units = getNums(_maxH, 2);
    return fontSize * units;
  } else if (_maxH.endsWith("rem")) {
    return remToPixels(getNums(_maxH, 3));
  } else {
    /**
     * Note: vh and vw will be auto-converted to px in some browsers
     */
    const units = getNums(_maxH, 2);
    if (_maxH.endsWith("vh")) {
      return (units * window.innerHeight) / 100;
    }
    if (_maxH.endsWith("vw")) {
      return (units * window.innerWidth) / 100;
    }
  }
  return 0;
}

/**
 * @param child HTMLDivElement
 * @return object {height: number, width: number} of the element in px, inclusive of margins, padding and borders
 */
function getHeightWidth(child: HTMLDivElement): IHeightWidth {
  const styles = window.getComputedStyle(child);
  const height = Math.ceil(
    child.offsetHeight +
      parseFloat(styles["marginTop"]) +
      parseFloat(styles["marginBottom"])
  );
  const width = Math.ceil(
    child.offsetWidth +
      parseFloat(styles["marginLeft"]) +
      parseFloat(styles["marginRight"])
  );
  return { height: Math.ceil(height), width: Math.ceil(width) };
}

/**
 * Get the minimum width of an element by iterating over its children.
 * @param ref React.MutableRefObject containing the column node
 * @param maxHeight of the parent column in px
 * @return minimum width of element required to contain all its children in a column/-reverse wrap/-reverse flex format
 */
export function getMinWidth(
  ref: MutableRefObject<any>,
  maxHeight: number,
  constantHeight = false,
  constantWidth = false
): number {
  const children: HTMLDivElement[] = [].slice.call(ref.current?.children);
  let oldHeight = 0;
  let oldWidth = 0;
  let reqWidth = 0;
  let _cHeight = 0;
  let _cWidth = 0;
  children.forEach((child: HTMLDivElement) => {
    if (
      (constantWidth && _cWidth === 0) ||
      (constantHeight && _cHeight === 0)
    ) {
      /**
       * init _c... as the values of the first child
       */
      const { height, width } = getHeightWidth(child);
      _cHeight = height;
      _cWidth = width;
    }

    /**
     * If not constantHeight or not constantWidth, re-assign values on each iteration. Else, re-use _cHeight and _cWidth
     */
    if (!constantHeight && !constantWidth) {
      const { height, width } = getHeightWidth(child);
      _cHeight = height;
      _cWidth = width;
    } else if (!constantHeight) {
      const { height } = getHeightWidth(child);
      _cHeight = height;
    } else if (!constantWidth) {
      const { width } = getHeightWidth(child);
      _cWidth = width;
    }

    const newHeight = oldHeight + _cHeight;
    if (newHeight > maxHeight) {
      /**
       * Scenario 1: max column height exceeded
       * Add column, incrementing required width by new element width
       */
      oldHeight = _cHeight;
      oldWidth = _cWidth;
      reqWidth += _cWidth;
    } else {
      /**
       * Scenario 2: max column height not exceeded
       * Update current (last) column height and increment width if latest element is the widest element in this column
       */
      oldHeight = newHeight;
      if (_cWidth > oldWidth) {
        reqWidth += _cWidth - oldWidth;
        oldWidth = _cWidth;
      }
    }
  });
  return reqWidth;
}
