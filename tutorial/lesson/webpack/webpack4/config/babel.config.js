const presets = [
  [
    "@babel/env",
    {
      targets: {
        chrome: "70",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };