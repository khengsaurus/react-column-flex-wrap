import React, { CSSProperties, forwardRef, MutableRefObject } from "react";
import { useRef } from "react";
import useDynamicWidth from "../hooks/useDynamicWidth";

interface IColumnProps {
  children?: any;
  className?: string;
  id?: string;
  key?: string;
  style?: CSSProperties;
  wrap?: boolean;
}

const Column = forwardRef<MutableRefObject<any>, IColumnProps>(
  (props: IColumnProps, ref?: MutableRefObject<any>) => {
    const rand = Math.random();
    const {
      id = `column-wrap-id-${rand}`,
      key = `column-wrap-key-${rand}`,
      children,
      className = "",
      style = {},
      wrap = true,
    } = props;
    const _ref = useRef<MutableRefObject<any>>();
    const containerRef = wrap ? ref || _ref : null;
    useDynamicWidth({ containerRef });

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
