const presets = [
  [
    "@babel/env",
    {
      targets: {
        chrome: "70",
        ie: "11"
      },
      useBuiltIns: "entry",
    },
  ],
];

module.exports = { presets };