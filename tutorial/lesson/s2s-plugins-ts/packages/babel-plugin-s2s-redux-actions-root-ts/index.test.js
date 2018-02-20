"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pluginTester = require("babel-plugin-tester");
var path = require("path");
var _1 = require(".");
var cwd = __dirname;
// index.tsが作成されることを確認
var output = path.resolve(cwd, 'src', 'actions', 'index.ts');
var input = __dirname + "/__fixtures__/**/*.ts";
// コードがあるとき
pluginTester({
    plugin: _1.default,
    snapshot: true,
    pluginOptions: { input: input, output: output },
    tests: [
        {
            title: 'index.tsが作成されて、内容が正しいこと',
            code: "empty",
        },
    ],
});
