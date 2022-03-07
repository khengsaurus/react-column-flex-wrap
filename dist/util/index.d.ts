import { MutableRefObject } from "react";
/**
 * Get the minimum width of an element by iterating over its children.
 * @param ref React.MutableRefObject containing the column node
 * @param constantHeight take height of first child as reference for the others
 * @param constantWidth take width of first child as reference for the others
 * @return minimum width of element required to contain all its children in a column/-reverse wrap/-reverse flex format
 */
export declare function getMinWidth(ref: MutableRefObject<any>, constantHeight?: boolean, constantWidth?: boolean, setMaxHeight?: number): number;
