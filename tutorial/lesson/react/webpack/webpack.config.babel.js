import 'babel-polyfill';

// コンテナ中では/my_webpack/webpack.config.babel.jsに配置
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 8080,
    host:"0.0.0.0"
  }
};