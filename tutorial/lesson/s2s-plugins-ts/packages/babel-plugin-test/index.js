"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param param0 {types:Types} tはbabel-types
 */
var plugin = function (args) {
    var t = args && args.types;
    return {
        visitor: {
            BinaryExpression: function (nodePath) {
                if (nodePath.node.operator !== '*') {
                    var newAst = t.binaryExpression('*', nodePath.node.left, nodePath.node.right);
                    nodePath.replaceWith(newAst);
                }
            }
        }
    };
};
exports.default = plugin;
