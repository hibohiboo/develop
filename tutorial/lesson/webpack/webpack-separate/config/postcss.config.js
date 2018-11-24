module.exports = {
  plugins: [
    require('cssnano')({
        preset: 'default',
        autoprefixer: false
    }),
    require('autoprefixer')
  ],
};