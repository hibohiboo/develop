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
const overrides = [{
  test: "./src/assets/elm/ElmTest.js",
  sourceType: "script",
}];
module.exports = { presets, overrides };