"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pluginTester = require("babel-plugin-tester");
var _1 = require(".");
pluginTester({
    plugin: _1.default,
    tests: [
        {
            title: 'snapshot test',
            code: "var a = 1 + 1",
            snapshot: true,
        },
        {
            title: 'no change',
            code: "var a = 1 * 1;",
            output: "var a = 1 * 1;",
        },
    ],
});
