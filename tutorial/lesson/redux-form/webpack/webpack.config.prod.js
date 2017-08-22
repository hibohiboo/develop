var webpack = require('webpack');

module.exports = {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    js: './app.tsx',
    // code-splitting用の設定
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-form']
  },
  // distにビルドしたファイルをbundle.jsの名前で保存
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js",".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      // .ts, .tsxに一致する拡張子のファイルはts-loaderを通してトランスパイル
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
      // .js, .jsxに一致するファイルはbabel-loaderを通してコンパイル
      { test: /\.js(x?)$/, 
        exclude: /node_modules/, 
        use:[
        {
          loader:"babel-loader",
          // Babel のオプションを指定する
          options: {
            presets: [
              // env を指定することで、ES2017 を ES5 に変換。
              // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
              // webpack の Tree Shaking 機能が使えない
              ['env', {'modules': false}]
            ]
          }
        }
      ] }
    ]
  },
  // ソースマップを有効にする
  devtool: 'source-map',
    
  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    // JSファイルのminifyを実行する
    new webpack.optimize.UglifyJsPlugin({
       sourceMap: true
    }),
    // code-splittingを有効にするプラグイン
    new webpack.optimize.CommonsChunkPlugin({/* chunkName= */name: "common"})
  ]
};