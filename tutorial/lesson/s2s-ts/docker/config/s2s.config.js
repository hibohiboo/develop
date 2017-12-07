
module.exports = {
  watch: './**/*.ts',
  plugins: [
    {
      test: /actionTypes.ts$/,
      plugin: ['s2s-action-types-ts', {
        usePrefix: true,
        removePrefix: 'src/',
      }],
    },
  ],
}