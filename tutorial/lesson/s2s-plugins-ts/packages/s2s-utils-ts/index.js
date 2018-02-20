"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var s2s_utils_1 = require("s2s-utils");
exports.getImportPath = function (from, to) {
    var path = s2s_utils_1.getImportPath(from, to);
    var formatted = path.replace(/\.\w+$/, '');
    if (!/^\.\.?/.test(formatted)) {
        return "./" + formatted;
    }
    return formatted;
};
