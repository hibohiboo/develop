const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'entry',
    },
  ],
];

// sourceType: scriptにしないと、babelが グローバルの this を void 0 に変えてしまう
const overrides = [{
  test: /Main\.js$/,
  sourceType: 'script',
}];
module.exports = { presets, overrides };
