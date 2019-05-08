const path = require('path');
const webpack = require('webpack');

const projectRootPath = path.resolve(__dirname, '../');
const outputPath = path.join(projectRootPath, 'dist');

module.exports = {
  mode: 'development',
  entry: {
    elmApp: [path.join(__dirname, 'src', 'index.js')].filter(Boolean),
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: ["elm-webpack-loader"]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  devServer: {
    contentBase: projectRootPath,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};
