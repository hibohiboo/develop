var test = require('./babel-plugin-test/index.js').default;
console.log(test)
module.exports = {
  watch: './**/*.ts',
  plugins: [
    {
      test: /.*.ts$/,
      plugin: [test],
    },
  ],
}