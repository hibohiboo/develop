const presets = [
  [
    "@babel/env",
    {
      targets: {
        chrome: "70"
      },
      useBuiltIns: "entry"
    },
    
  ],
];

// sourceType: scriptにしないと、babelが グローバルの this を void 0 に変えてしまう
const overrides = [{
  test: "./src/assets/elm/ElmTest.js",
  sourceType: "script",
}];
module.exports = { presets, overrides };