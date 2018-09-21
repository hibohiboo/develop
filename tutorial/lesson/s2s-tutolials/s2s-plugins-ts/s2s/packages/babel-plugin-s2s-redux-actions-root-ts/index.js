"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_syntax_typescript_1 = require("@babel/plugin-syntax-typescript");
var globby = require("globby");
var s2s_utils_ts_1 = require("../s2s-utils-ts");
exports.default = (function (babel) {
    if (babel === undefined) {
        return { visitor: {} };
    }
    var t = babel.types;
    var defaultExport = (function (source) { return t.exportAllDeclaration(t.stringLiteral(source)); });
    return {
        name: 's2s-redux-actions-root-ts',
        inherits: plugin_syntax_typescript_1.default,
        visitor: {
            Program: {
                exit: function (path, state) {
                    var _a = state.opts, input = _a.input, output = _a.output;
                    if (!input) {
                        throw new Error('require input option');
                    }
                    if (!output) {
                        throw new Error('require output option');
                    }
                    var files = globby.sync(input);
                    var index = files.indexOf(output);
                    if (index > -1) {
                        files.splice(index, 1);
                    }
                    var imports = files.map(function (f) { return defaultExport(s2s_utils_ts_1.getImportPath(output, f)); });
                    path.node.body = imports.slice();
                },
            },
        },
    };
});
