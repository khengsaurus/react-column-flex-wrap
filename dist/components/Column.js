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
