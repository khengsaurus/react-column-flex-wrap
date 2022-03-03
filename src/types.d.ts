export interface IUseDynamicWidthProps {
  containerRef: MutableRefObject<any>;
  constantHeight?: boolean;
  constantWidth?: boolean;
  dependencies?: any[];
}

export interface IHeightWidth {
  height: number;
  width: number;
}
