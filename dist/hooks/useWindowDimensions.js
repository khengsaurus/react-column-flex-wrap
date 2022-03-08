"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowDimensionsImpl = void 0;
var react_1 = require("react");
var react_singleton_hook_1 = require("react-singleton-hook");
/**
 * Returns a number proxy for window size, changes on window resize.
 * Uses singletonHook from react-singleton-hook so that the proxy can be referenced multiple times without re-calculation.
 *
 * @param on boolean
 * @return proxy number for window size
 */
var useWindowDimensionsImpl = function () {
    var _a = (0, react_1.useState)(0), windowDimProxy = _a[0], setWindowDimProxy = _a[1];
    var handleResize = (0, react_1.useCallback)(function () {
        setWindowDimProxy(window.innerHeight + 1000 * window.innerWidth);
    }, []);
    (0, react_1.useEffect)(function () {
        handleResize();
        window.addEventListener("resize", handleResize);
        return function () { return window.removeEventListener("resize", handleResize); };
    }, [handleResize]);
    return windowDimProxy;
};
exports.useWindowDimensionsImpl = useWindowDimensionsImpl;
var useWindowDimensions = (0, react_singleton_hook_1.singletonHook)(0, exports.useWindowDimensionsImpl);
exports.default = useWindowDimensions;
