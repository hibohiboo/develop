export const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: (loader) => [require('autoprefixer')()]
  }
};
export const cssLoader = { 
  loader: 'css-loader',
  options: {
    url: false   // url()を変換しない
  }
};
