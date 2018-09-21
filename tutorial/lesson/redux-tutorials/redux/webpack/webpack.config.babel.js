import 'babel-polyfill';
import path from 'path';
import webpack from 'webpack';

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './app.js',
    html: './index.html'
  },
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?compact=false',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 8080,
    host:"0.0.0.0",
    hot: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 5000
  }
};