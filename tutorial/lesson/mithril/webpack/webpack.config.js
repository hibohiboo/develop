
var webpack = require('webpack');

module.exports = {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    typescript: './app.js',
    // code-splitting用の設定
    vendor: ['mithril', 'redux', 'mithril-redux']
  },
  // distにビルドしたファイルをbundle.jsの名前で保存
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".ts", ".tsx", '.msx']
  },
  module: {
    rules: [
      // .tsに一致する拡張子のファイルはts-loaderを通してトランスパイル
      { test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader" },
      // .tsに一致する拡張子のファイルはts-loader,msx-loaderを通してトランスパイル
      { test: /\.tsx$/, exclude: /node_modules/, loaders:["msx-loader", "ts-loader"] },
      // .msxに一致する拡張子のファイルはmsx-loaderを通してトランスパイル
      { test: /\.msx$/, exclude: /node_modules/, loaders:["msx-loader"] },
    ]
  },
  plugins: [
    // hot loadを有効にするためのプラグイン
    new webpack.HotModuleReplacementPlugin(),
    // code-splittingを有効にするプラグイン
    new webpack.optimize.CommonsChunkPlugin({/* chunkName= */name: "vendor", /* filename= */ filename: "vendor.bundle.js"})
  ],
  // source-mapを出力して、ブラウザの開発者ツールからデバッグできるようにする。
  // webpack-dev-serverなら不要？
  // devtool: '#cheap-module-source-map',
  // 開発サーバの設定
  devServer: {
    // public/index.htmlをデフォルトのホームとする
    contentBase: './public',
    // インラインモード
    inline: true,
    // 8080番ポートで起動
    port: 8080,
    // dockerのコンテナ上でサーバを動かすときは以下の設定で全ての接続を受け入れる
    host:"0.0.0.0",
    // hot loadを有効にする
    hot: true
  },
  // vagrantの仕様でポーリングしないとファイルの変更を感知できない
  watchOptions: {
    aggregateTimeout: 300,
    // ５秒毎にポーリング
    poll: 5000
  }
};