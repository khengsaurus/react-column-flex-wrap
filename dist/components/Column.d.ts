import React from "react";
import { IColumnProps } from "../types";
/**
 * A flex div with `flex-flow: column wrap` by default. Its width will expand to contain its children.
 * Supports column-reverse and wrap-reverse if passed via props, styles or css class, but will override other display and flex-wrap styles.
 *
 * Important! The column's max-height or height has to be specified via the maxHeight prop, styles or css class (in px, %, vh, vw, em or rem)
 * @param id optional
 * @param key optional
 * @param ref React.MutableRefObject<any> to be forwarded to the core parent div
 * @param className optional class name conferring styles
 * @param style optional in-line styles
 * @param columnReverse default false - if true the component will have `flex-direction: column-reverse` regardless of in-line style or css class
 * @param wrapReverse default false - if true the component will have `flex-wrap: wrap-reverse` regardless of in-line style or css class
 * @param maxHeight default 0 - if a value greater than 0 is provided, it will be set as the component's maximum height in px
 * @param constantHeight default false - if true the first child's height will be taken as reference for the others
 * @param constantWidth default false - if true the first child's width will be taken as reference for the others
 * @param dependencies optional dependencies for the core hook used to set the component's width
 * @param effectOn default true - set the effect on or off
 * @param testId optional - testId to be assigned to the Component. If not provided, if id is provided it be appended to `rcfw-c-`. If neither are provided, the Component will have testId of `rcfw-c`
 */
declare const Column: React.ForwardRefExoticComponent<IColumnProps & React.RefAttributes<React.MutableRefObject<any>>>;
export default Column;
