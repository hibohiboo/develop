"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin = function (args) {
    if (args === undefined) {
        return { visitor: {} };
    }
    var t = args.types;
    return {
        visitor: {
            BinaryExpression: function (nodePath) {
                if (nodePath.node.operator !== '*') {
                    var newAst = t.binaryExpression('*', nodePath.node.left, nodePath.node.right);
                    nodePath.replaceWith(newAst);
                }
            },
        },
    };
};
exports.default = plugin;
