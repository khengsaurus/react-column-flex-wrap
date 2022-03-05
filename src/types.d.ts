export interface IUseDynamicWidthProps {
  columnRef: MutableRefObject<any>;
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
  testId?: string;
}

export interface IHeightWidth {
  height: number;
  width: number;
}
