const presets = [
  [
    "@babel/env",
    {
      targets: {
        chrome: "70",
        ie: "11"
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };