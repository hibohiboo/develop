const path = require('path');
const webpack = require('webpack');

const projectRootPath = path.resolve(__dirname, '../');
const outputPath = path.join(projectRootPath, 'dist');

module.exports = {
  mode: 'development',
  entry: {
    reactApp: [path.join(__dirname, 'src', 'index.jsx')],
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: projectRootPath,
    historyApiFallback: true,
  },
};
