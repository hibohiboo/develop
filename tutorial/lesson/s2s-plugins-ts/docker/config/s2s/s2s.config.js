module.exports = {
  watch: './**/*.ts',
  plugins: [
    {
      test: /.*.ts$/,
      plugin: ['babel-plugin-s2s-action-creator-ts'],
    },
  ],
}