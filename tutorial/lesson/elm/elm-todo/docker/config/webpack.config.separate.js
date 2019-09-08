const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const MODE = 'production';
const filename = MODE === 'production' ? '[name]-[hash].js' : 'index.js';

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, 'separate/pre-dist'),
  dest: path.join(__dirname, 'separate/dist'),
};

module.exports = {
  mode: MODE,
  entry: path.join(opts.src, 'index.js'),
  output: {
    path: opts.dest,
    publicPath: '/',
    filename,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(opts.src, 'index.html'),
      inject: 'body',
    }),
  ],
  resolve: {
    modules: [opts.src, 'node_modules'],
    extensions: ['.js', '.css', '.png'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
