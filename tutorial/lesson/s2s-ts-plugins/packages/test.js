"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var babel_core_1 = require("babel-core");
var src = " 1 + 2 ";
var plugin = function (_a) {
    var t = _a.types;
    return ({
        visitor: {
            BinaryExpression: function (nodePath) {
                if (nodePath.node.operator !== '*') {
                    var newAst = t.binaryExpression('*', nodePath.node.left, nodePath.node.right);
                    nodePath.replaceWith(newAst);
                }
            }
        }
    });
};
var code = babel_core_1.transform(src, { plugins: [plugin] }).code;
console.log(code);
