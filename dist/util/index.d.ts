import { MutableRefObject } from "react";
import { IHeightWidth } from "../types";
/**
 * @param rem: units in rem
 * @return value in px
 */
declare function remToPixels(rem: any): number;
/**
 * @param str: height as string, with units
 * @param unitLength: length of the unit of str
 * @return numerical value of str without units
 */
declare function getNums(str: string, unitLength: number): number;
/**
 * @param ref React.MutableRefObject containing the node to calculate
 * @param maxHeight optional string value of the node's max-height, with or without units: '%' | 'px' | 'vh' | 'vw' | 'em' | 'rem'
 * @return maximum height in px, inclusive of margins, padding and borders
 */
declare function getMaxHeight(ref: MutableRefObject<any>, maxHeight?: string): number;
/**
 * @param child HTMLDivElement
 * @return object {height: number, width: number} of the element in px, inclusive of margins, padding and borders
 */
declare function getHeightWidth(child: HTMLDivElement): IHeightWidth;
/**
 * Get the minimum width of an element by iterating over its children.
 * @param ref React.MutableRefObject containing the column node
 * @param maxHeight of the parent column in px
 * @return minimum width of element required to contain all its children in a column/-reverse wrap/-reverse flex format
 */
declare function getMinWidth(ref: MutableRefObject<any>, maxHeight: number, constantHeight?: boolean, constantWidth?: boolean): number;
declare const _default: {
    remToPixels: typeof remToPixels;
    getNums: typeof getNums;
    getMaxHeight: typeof getMaxHeight;
    getHeightWidth: typeof getHeightWidth;
    getMinWidth: typeof getMinWidth;
};
export default _default;
