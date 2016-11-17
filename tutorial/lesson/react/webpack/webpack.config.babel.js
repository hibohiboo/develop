import 'babel-polyfill';

// コンテナ中では/my_webpack/webpack.config.babel.jsに配置

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
      {test: /\.jsx?$/, loaders: ['babel-loader']},
    ]
  }
  //,devtool: '#cheap-module-eval-source-map'
};