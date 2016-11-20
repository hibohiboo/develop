import 'babel-polyfill';

// コンテナ中では/my_webpack/webpack.config.babel.jsに配置

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".js", ".yml"]
  },
  module: {
    rules: [
      {test: /\.yml$/, loaders: ['json-loader', 'yaml-loader']},
      {test: /\.js$/, loaders: ['babel-loader']},
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Sample Page'
    })
  ],
  devtool: '#cheap-module-eval-source-map'
};