"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * Hook to listen to window resize
 * @param on boolean
 * @return number which changes on window resize
 */
var useWindowDimensions = function (on) {
    if (on === void 0) { on = true; }
    var windowRef = (0, react_1.useRef)(0);
    var handleResize = (0, react_1.useCallback)(function () { return (windowRef.current = window.innerHeight + 100 * window.innerWidth); }, []);
    (0, react_1.useEffect)(function () {
        if (on) {
            window.addEventListener("resize", handleResize);
        }
        return function () {
            if (on) {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, [handleResize, on]);
    return windowRef.current;
};
exports.default = useWindowDimensions;
