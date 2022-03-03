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
var overrideDisplay = ["block", "none"];
var overrideFlex = ["none", "row", "row-reverse"];
var overrideWrap = ["none", "nowrap"];
var columnDirs = ["column", "column-reverse"];
var wrapDirs = ["wrap", "wrap-reverse"];
var useDynamicWidth = function (_a) {
    var _b;
    var containerRef = _a.containerRef, constantHeight = _a.constantHeight, constantWidth = _a.constantWidth, _c = _a.dependencies, dependencies = _c === void 0 ? [] : _c;
    var children = containerRef
        ? Array.from(((_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.children) || [])
        : [];
    return (0, react_1.useLayoutEffect)(function () {
        var _a;
        if (!!containerRef) {
            var _b = window.getComputedStyle(containerRef.current), display = _b.display, flexDirection = _b.flexDirection, flexWrap = _b.flexWrap, maxHeight = _b.maxHeight;
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
                !(0, lodash_isempty_1.default)((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.children)) {
                var maxHeightPx = maxHeight.endsWith("px")
                    ? (0, util_1.getNums)(maxHeight, 2)
                    : (0, util_1.getMaxHeight)(containerRef, maxHeight);
                var minWidth = (0, util_1.getMinWidth)(containerRef, maxHeightPx, constantHeight, constantWidth);
                containerRef.current.style.display = display;
                containerRef.current.style.flexDirection = flexDirection;
                containerRef.current.style.flexWrap = flexWrap;
                containerRef.current.style.width = "".concat(minWidth, "px");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, __spreadArray([containerRef, children.length], dependencies, true));
};
exports.default = useDynamicWidth;
