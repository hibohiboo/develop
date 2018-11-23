const presets = [
  [
    "@babel/env",
    {
      targets: {
        chrome: "70"
      },
      useBuiltIns: "entry",
    },
  ],
];

module.exports = { presets };