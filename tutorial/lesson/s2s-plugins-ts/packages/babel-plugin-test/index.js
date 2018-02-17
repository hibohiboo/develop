"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("babel-types");
/**
 *
 * @param param0 {types:Types} tはbabel-types
 */
var plugin = function () { return ({
    visitor: {
        BinaryExpression: function (nodePath) {
            if (nodePath.node.operator !== '*') {
                var newAst = t.binaryExpression('*', nodePath.node.left, nodePath.node.right);
                nodePath.replaceWith(newAst);
            }
        }
    }
}); };
exports.default = plugin;
