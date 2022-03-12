"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var hooks_1 = require("../hooks");
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
var Column = (0, react_1.forwardRef)(function (props, ref) {
    var rand = Math.random();
    var _a = props.id, id = _a === void 0 ? "column-wrap-id-".concat(rand) : _a, _b = props.key, key = _b === void 0 ? "column-wrap-key-".concat(rand) : _b, children = props.children, _c = props.className, className = _c === void 0 ? "" : _c, _d = props.style, style = _d === void 0 ? {} : _d, _e = props.constantHeight, constantHeight = _e === void 0 ? false : _e, _f = props.constantWidth, constantWidth = _f === void 0 ? false : _f, _g = props.columnReverse, columnReverse = _g === void 0 ? false : _g, _h = props.wrapReverse, wrapReverse = _h === void 0 ? false : _h, _j = props.maxHeight, maxHeight = _j === void 0 ? 0 : _j, _k = props.dependencies, dependencies = _k === void 0 ? [] : _k, _l = props.effectOn, effectOn = _l === void 0 ? true : _l, _m = props.testId, testId = _m === void 0 ? "" : _m;
    var _ref = (0, react_1.useRef)(null);
    var columnRef = effectOn ? ref || _ref : null;
    /**
     * Call to main hook to set component size.
     */
    (0, hooks_1.useDynamicWidth)({
        columnRef: columnRef,
        columnReverse: columnReverse,
        wrapReverse: wrapReverse,
        maxHeight: maxHeight,
        constantHeight: constantHeight,
        constantWidth: constantWidth,
        dependencies: dependencies,
    });
    return ((0, jsx_runtime_1.jsx)("div", __assign({ id: id, className: className, style: style, ref: columnRef, "data-testid": testId ? "rcfw-c-" + testId : "rcfw-c" }, { children: children }), key));
});
exports.default = Column;
