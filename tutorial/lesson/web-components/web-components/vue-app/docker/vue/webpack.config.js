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
    // // https://qiita.com/magaya0403/items/3fbe9aa20c6a66b76662
    // // aliasを追加
    // alias: {
    //   'vue$': 'vue/dist/vue.esm.js'
    // },
  },
  plugins: [new VueLoaderPlugin()],
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
