import 'babel-polyfill'; // このファイルでes6の記法が使えるようにする
import path from 'path';
import webpack from 'webpack';

module.exports = {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    javascript: './app.js'
  },
  // distにビルドしたファイルをbundle.jsの名前で保存
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      // .js, .jsxに一致する拡張子のファイルはbabel-loaderを通してトランスパイル
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        // ビルド時に警告が出るのでcompact=falseを指定
        loader: 'babel-loader?compact=false',
        include: path.join(__dirname, 'src')
      }
    ]
  },
  // hot loadを有効にするためのプラグイン
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // source-mapを出力して、ブラウザの開発者ツールからデバッグできるようにする。
  devtool: '#cheap-module-eval-source-map',
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