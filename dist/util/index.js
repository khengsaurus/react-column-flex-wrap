"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinWidth = exports.getMaxHeight = exports.getNums = void 0;
/**
 * @param rem: units in rem
 * @return value in px
 */
function remToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
/**
 * @param str: height as string, with units
 * @param unitLength: length of the unit of str
 * @return numerical value of str without units
 */
function getNums(str, unitLength) {
    return Number(str.slice(0, str.length - unitLength)) || 0;
}
exports.getNums = getNums;
/**
 * @param ref React.MutableRefObject containing the node to calculate
 * @param maxHeight optional string value of the node's max-height, with or without units: '%' | 'px' | 'vh' | 'vw' | 'em' | 'rem'
 * @return maximum height in px, inclusive of margins, padding and borders
 */
function getMaxHeight(ref, maxHeight) {
    if (maxHeight === void 0) { maxHeight = ""; }
    var _maxH;
    /**
     * use maxHeight if provided or maxHeight or height from computed styles
     */
    if (maxHeight) {
        var _n = Number(maxHeight);
        if (_n > 0) {
            return _n;
        }
        _maxH = maxHeight;
    }
    else {
        var _a = window.getComputedStyle(ref.current), height = _a.height, _maxHeight = _a.maxHeight;
        _maxH = _maxHeight === "none" || !_maxHeight ? height : maxHeight;
    }
    if (_maxH.endsWith("px")) {
        return getNums(_maxH, 2);
    }
    else if (_maxH.endsWith("%")) {
        /**
         * Calculate height as percentage of parent element's height
         */
        var _b = window.getComputedStyle(ref.current.parentNode).height, parentHeight = _b === void 0 ? "0" : _b;
        var percentage = getNums(_maxH, 1);
        return ((Number(parentHeight.slice(0, parentHeight.length - 2)) * percentage) /
            100);
    }
    else if (_maxH.endsWith("em")) {
        var fontSize = parseFloat(getComputedStyle(ref.current).fontSize) || 0;
        var units = getNums(_maxH, 2);
        return fontSize * units;
    }
    else if (_maxH.endsWith("rem")) {
        return remToPixels(getNums(_maxH, 3));
    }
    else {
        /**
         * Note: vh and vw will be auto-converted to px in some browsers
         */
        var units = getNums(_maxH, 2);
        if (_maxH.endsWith("vh")) {
            return (units * window.innerHeight) / 100;
        }
        if (_maxH.endsWith("vw")) {
            return (units * window.innerWidth) / 100;
        }
    }
    return 0;
}
exports.getMaxHeight = getMaxHeight;
/**
 * @param child HTMLDivElement
 * @return object {height: number, width: number} of the element in px, inclusive of margins, padding and borders
 */
function getHeightWidth(child) {
    var styles = window.getComputedStyle(child);
    var height = Math.ceil(child.offsetHeight +
        parseFloat(styles["marginTop"]) +
        parseFloat(styles["marginBottom"]));
    var width = Math.ceil(child.offsetWidth +
        parseFloat(styles["marginLeft"]) +
        parseFloat(styles["marginRight"]));
    return { height: Math.ceil(height), width: Math.ceil(width) };
}
/**
 * @description Get the minimum width of an element by iterating over its children S
 * @param ref React.MutableRefObject containing the container node
 * @param maxHeight of the parent container in px
 * @return minimum width of element required to contain all its children in a column/-reverse wrap/-reverse flex format
 * @complexity time: O(S); space: S; overhead:
 */
function getMinWidth(ref, maxHeight, constantHeight, constantWidth) {
    var _a;
    if (constantHeight === void 0) { constantHeight = false; }
    if (constantWidth === void 0) { constantWidth = false; }
    var children = [].slice.call((_a = ref.current) === null || _a === void 0 ? void 0 : _a.children);
    var oldHeight = 0;
    var oldWidth = 0;
    var reqWidth = 0;
    var _cHeight = 0;
    var _cWidth = 0;
    children.forEach(function (child) {
        if ((constantWidth && _cWidth === 0) ||
            (constantHeight && _cHeight === 0)) {
            /**
             * init _c as the values of the first child
             */
            var _a = getHeightWidth(child), height = _a.height, width = _a.width;
            _cHeight = height;
            _cWidth = width;
        }
        /**
         * If not constantHeight or not constantWidth, re-assign values on each iteration. Else, re-use _cHeight and _cWidth
         */
        if (!constantHeight && !constantWidth) {
            var _b = getHeightWidth(child), height = _b.height, width = _b.width;
            _cHeight = height;
            _cWidth = width;
        }
        else if (!constantHeight) {
            var height = getHeightWidth(child).height;
            _cHeight = height;
        }
        else if (!constantWidth) {
            var width = getHeightWidth(child).width;
            _cWidth = width;
        }
        var newHeight = oldHeight + _cHeight;
        if (newHeight > maxHeight) {
            /**
             * Scenario 1: max column height exceeded
             * Add column, incrementing required width by new element width
             */
            oldHeight = _cHeight;
            oldWidth = _cWidth;
            reqWidth += _cWidth;
        }
        else {
            /**
             * Scenario 2: max column height not exceeded
             * Update current (last) column height and increment width if latest element is the widest element in this column
             */
            oldHeight = newHeight;
            if (_cWidth > oldWidth) {
                reqWidth += _cWidth - oldWidth;
                oldWidth = _cWidth;
            }
        }
    });
    return reqWidth;
}
exports.getMinWidth = getMinWidth;
