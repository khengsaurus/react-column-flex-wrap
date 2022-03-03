export interface IUseDynamicWidthProps {
  containerRef: MutableRefObject<any>;
  constantHeight?: boolean;
  constantWidth?: boolean;
  dependencies?: any[];
}

export interface IColumnProps {
  children?: any;
  className?: string;
  id?: string;
  key?: string;
  style?: CSSProperties;
  constantHeight?: boolean;
  constantWidth?: boolean;
  dependencies?: any[];
  effectOn?: boolean;
}

export interface IHeightWidth {
  height: number;
  width: number;
}
