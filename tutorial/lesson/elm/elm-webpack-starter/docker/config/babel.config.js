const presets = [
  [
    '@babel/env',
    {
      targets: {
        chrome: 'latest',
      },
      useBuiltIns: 'entry',
    },
  ],
];

// sourceType: scriptにしないと、babelが グローバルの this を void 0 に変えてしまう
const overrides = [{
  // test: /elm\/.*\.js$/,
  test: /Main\.js$/,
  sourceType: 'script',
}];
module.exports = { presets, overrides };
