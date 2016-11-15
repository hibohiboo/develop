var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".yml"]
  },
  module: {
    loaders: [
      {test: /\.yml$/, loaders: ['json-loader', 'yaml-loader']}
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