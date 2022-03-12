"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useIsoEffect = typeof window !== "undefined" ? react_1.useLayoutEffect : react_1.useEffect;
exports.default = useIsoEffect;
