const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    publicPath: '',
    filename,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(opts.src, 'index.html'),
      inject: 'body',
    }),
    new CleanWebpackPlugin([opts.dest], {
      root: __dirname,
      exclude: [],
      verbose: true,
      dry: false,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(opts.src, 'assets'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
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
      {
        test: /\.css$/,
        exclude: [/elm-stuff/, /node_modules/],
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              url: false
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'file-loader',
      },
    ],
  },
};
