import { MutableRefObject } from "react";
/**
 * @param str: height as string, with units
 * @param unitLength: length of the unit of str
 * @return numerical value of str without units
 */
export declare function getNums(str: string, unitLength: number): number;
/**
 * @param ref React.MutableRefObject containing the node to calculate
 * @param maxHeight optional string value of the node's max-height, with or without units: '%' | 'px' | 'vh' | 'vw' | 'em' | 'rem'
 * @return maximum height in px, inclusive of margins, padding and borders
 */
export declare function getMaxHeight(ref: MutableRefObject<any>, maxHeight?: string): number;
/**
 * @description Get the minimum width of an element by iterating over its children S
 * @param ref React.MutableRefObject containing the container node
 * @param maxHeight of the parent container in px
 * @return minimum width of element required to contain all its children in a column/-reverse wrap/-reverse flex format
 * @complexity time: O(S); space: S; overhead:
 */
export declare function getMinWidth(ref: MutableRefObject<any>, maxHeight: number, constantHeight?: boolean, constantWidth?: boolean): number;
