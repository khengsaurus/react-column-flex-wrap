"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_isempty_1 = __importDefault(require("lodash.isempty"));
var react_1 = require("react");
var util_1 = require("../util");
var useWindowDimensions_1 = __importDefault(require("./useWindowDimensions"));
var wrapDirs = ["wrap", "wrap-reverse"];
var columnDirs = ["column", "column-reverse"];
var overrideWrap = ["none", "nowrap"];
var overrideFlex = ["none", "row", "row-reverse"];
var overrideDisplay = ["none", "inline", "block", "inline-block"];
/**
 * @description Custom hook using useLayoutEffect to calculate minimum required width of element and set the following CSS properties:
 *
 * `display: flex`
 *
 * `flex-direction: column` or column-reverse if specified via styles or a css class
 *
 * `flex-wrap: wrap` or wrap-reverse if specified via styles or a css class
 */
var useDynamicWidth = function (_a) {
    var _b;
    var columnRef = _a.columnRef, constantHeight = _a.constantHeight, constantWidth = _a.constantWidth, _c = _a.onWindowResize, onWindowResize = _c === void 0 ? true : _c, _d = _a.dependencies, dependencies = _d === void 0 ? [] : _d;
    /**
     * Proxy ref to detect changes in window dimensions
     */
    var windowRef = (0, useWindowDimensions_1.default)(onWindowResize);
    var children = columnRef
        ? Array.from(((_b = columnRef.current) === null || _b === void 0 ? void 0 : _b.children) || [])
        : [];
    return (0, react_1.useLayoutEffect)(function () {
        var _a;
        if (!!columnRef) {
            var _b = window.getComputedStyle(columnRef.current), display = _b.display, flexDirection = _b.flexDirection, flexWrap = _b.flexWrap, height = _b.height, maxHeight = _b.maxHeight;
            if (!display || overrideDisplay.includes(display)) {
                display = "flex";
            }
            if (!flexDirection || overrideFlex.includes(flexDirection)) {
                flexDirection = "column";
            }
            if (!flexWrap || overrideWrap.includes(flexWrap)) {
                flexWrap = "wrap";
            }
            if (display === "flex" &&
                wrapDirs.includes(flexWrap) &&
                columnDirs.includes(flexDirection) &&
                !(0, lodash_isempty_1.default)((_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.children)) {
                var maxHeightPx = (0, util_1.getMaxHeight)(columnRef, maxHeight === "none" || !maxHeight ? height : maxHeight);
                var minWidth = (0, util_1.getMinWidth)(columnRef, maxHeightPx, constantHeight, constantWidth);
                columnRef.current.style.display = display;
                columnRef.current.style.flexDirection = flexDirection;
                columnRef.current.style.flexWrap = flexWrap;
                columnRef.current.style.width = "".concat(minWidth, "px");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, __spreadArray([columnRef, children.length, windowRef], dependencies, true));
};
exports.default = useDynamicWidth;
