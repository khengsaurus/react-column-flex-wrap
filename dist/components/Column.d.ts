import React, { CSSProperties } from "react";
interface IColumnProps {
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
declare const Column: React.ForwardRefExoticComponent<IColumnProps & React.RefAttributes<React.MutableRefObject<any>>>;
export default Column;
