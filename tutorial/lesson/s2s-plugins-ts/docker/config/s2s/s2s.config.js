var reduxActionsRoot = require('./babel-plugin-s2s-redux-actions-root-ts').default;

module.exports = {
  watch: './**/*.ts',
  plugins: [
    {
      test: /.*.ts$/,
      plugin: [test],
    },
    {
      test: /src\/actions\/(?!.*index).*\.ts/,
      plugin: ['s2s-redux-actions', {autocomplete: false}]
    },
    {
      test: /src\/actions\/(?!.*index).*\.ts/,
      output: "index.ts",
      plugin: [reduxActionsRoot,
      { input: 'src/actions/*.ts', output: "src/actions/index.ts" }]
    },
  ],

  templates: [
    {
      test: /src\/actions\/.*\.ts/, input: 'redux-action.ts'
    },
  ]

}