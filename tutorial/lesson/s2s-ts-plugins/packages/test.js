"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var babel_core_1 = require("babel-core");
var src = " 1 + 2 ";
/**
 *
 * @param param0 {types:Types} tはbabel-types
 */
var plugin = function (_a) {
    var t = _a.types;
    for(let prop in _a){
        if(_a.hasOwnProperty(prop)){
            console.log(prop)
        }

    }
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
