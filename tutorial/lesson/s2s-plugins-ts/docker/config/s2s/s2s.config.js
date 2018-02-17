var test = require('./babel-plugin-test').default;

module.exports = {
  watch: './**/*.ts',
  plugins: [
    {
      test: /.*.ts$/,
      plugin: [test],
    },
  ],
}