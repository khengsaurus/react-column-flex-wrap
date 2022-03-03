import React, { CSSProperties, forwardRef, MutableRefObject } from "react";
import { useRef } from "react";
import useDynamicWidth from "../hooks/useDynamicWidth";
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
const Column = forwardRef<MutableRefObject<any>, IColumnProps>(
  (props: IColumnProps, ref?: MutableRefObject<any>) => {
    const rand = Math.random();
    const {
      id = `column-wrap-id-${rand}`,
      key = `column-wrap-key-${rand}`,
      children,
      className = "",
      style = {},
      constantHeight = false,
      constantWidth = false,
      dependencies = [],
      effectOn = true,
    } = props;
    const _ref = useRef<MutableRefObject<any>>();
    const containerRef = effectOn ? ref || _ref : null;
    useDynamicWidth({
      containerRef,
      constantHeight,
      constantWidth,
      dependencies,
    });

    return (
      <div
        id={id}
        key={key}
        className={className}
        style={style}
        ref={containerRef}
      >
        {children}
      </div>
    );
  }
);

export default Column;
