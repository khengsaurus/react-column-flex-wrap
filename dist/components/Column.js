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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("react");
var useDynamicWidth_1 = __importDefault(require("../hooks/useDynamicWidth"));
/**
 * @description A flex div with column wrap properties by default. Its width will expand to contain all its children and push adjacent elements (unless they are positioned absolute/fixed).
 * Supports column-reverse and wrap-reverse if passed via styles or a css class, but will override other display and flex-wrap styles.
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
var Column = (0, react_1.forwardRef)(function (props, ref) {
    var rand = Math.random();
    var _a = props.id, id = _a === void 0 ? "column-wrap-id-".concat(rand) : _a, _b = props.key, key = _b === void 0 ? "column-wrap-key-".concat(rand) : _b, children = props.children, _c = props.className, className = _c === void 0 ? "" : _c, _d = props.style, style = _d === void 0 ? {} : _d, _e = props.constantHeight, constantHeight = _e === void 0 ? false : _e, _f = props.constantWidth, constantWidth = _f === void 0 ? false : _f, _g = props.dependencies, dependencies = _g === void 0 ? [] : _g, _h = props.effectOn, effectOn = _h === void 0 ? true : _h;
    var _ref = (0, react_2.useRef)();
    var containerRef = effectOn ? ref || _ref : null;
    (0, useDynamicWidth_1.default)({
        containerRef: containerRef,
        constantHeight: constantHeight,
        constantWidth: constantWidth,
        dependencies: dependencies,
    });
    return ((0, jsx_runtime_1.jsx)("div", __assign({ id: id, className: className, style: style, ref: containerRef }, { children: children }), key));
});
exports.default = Column;
