const path = require('path');
const webpack = require('webpack');

const projectRootPath = path.resolve(__dirname, '../');
const outputPath = path.join(projectRootPath, 'dist');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: {
    vueApp: [path.join(__dirname, 'src', 'index.js')].filter(Boolean),
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
  plugins: [new VueLoaderPlugin()],
  devServer: {
    contentBase: projectRootPath,
    historyApiFallback: true,
  },
};
