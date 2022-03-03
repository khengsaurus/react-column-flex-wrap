import React from "react";
import { IColumnProps } from "../types";
/**
 * @description A flex div with column wrap properties by default. Its width will expand to contain its children and push adjacent elements (unless they are positioned absolute/fixed).
 * Supports column-reverse and wrap-reverse if passed via styles or a css class, but will override other display and flex-wrap styles.
 *
 * Important! The column's max-height or height has to be specified via styles or css class, in px, %, vh, vw, em or rem.
 * @param className optional class name conferring styles
 * @param id optional
 * @param key optional
 * @param style optional CSS Properties
 * @param constantHeight default false - if true the first child's height will be taken as reference for the others
 * @param constantWidth default false - if true the first child's width will be taken as reference for the others
 * @param dependencies optional dependencies for the core hook used to set the component's width
 * @param effectOn default true - set the effect on or off
 * @param ref React.MutableRefObject<any> to be forwarded to the core parent div
 */
declare const Column: React.ForwardRefExoticComponent<IColumnProps & React.RefAttributes<React.MutableRefObject<any>>>;
export default Column;
