import 'babel-polyfill';
import webpack from 'webpack';

module.exports = {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    typescript: ['./app.tsx'],
    // code-splitting用の設定
    vendor: [ 'react', 'react-dom', 'redux', 'react-redux', 'axios',  'material-ui', 'material-ui-number-input', 'babel-polyfill']
  },
  // distにビルドしたファイルをbundle.jsの名前で保存
  output: {
    path: __dirname + '/dist',
    filename: 'scenariomaker.bundle.js'
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"]
  },
  module: {
    rules: [
      // .ts, .tsxに一致する拡張子のファイルはts-loader -> babel-loaderを通してトランスパイル
      { test: /\.tsx?$/, exclude: /node_modules/, loaders:["babel-loader", "ts-loader"] },
      // .js, .jsxに一致するファイルはbabel-loaderを通す。 uglifyを行うためにnode_module内もトランスパイル
      { test: /\.js(x?)$/, exclude: /node_modules/, loaders:["babel-loader"] },
      { test: /\.json$/, exclude: /node_modules/, loaders:["json-loader"] },
    ]
  },
  plugins: [
  // minify. es6はuglifyでのminfy不可
  // new webpack.optimize.UglifyJsPlugin({
  //   sourceMap: true,
  //   compress: {
  //     warnings: false,
  //   },
  // }),
    // code-splittingを有効にするプラグイン
    new webpack.optimize.CommonsChunkPlugin({/* chunkName= */name: "vendor", /* filename= */ filename: "vendor.react.bundle.js"})
  ],
  "devtool": 'source-map'
};