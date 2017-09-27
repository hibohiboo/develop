import webpack from 'webpack';

// 環境変数から本番環境を判断。
const isProduction = process.env.NODE_ENV === 'production';

// source-map : 正確・最小限。コンパイル速度低
// eval-source-map: 正確。コンパイル速度低。再作成速度中。
const devtool = isProduction ? 'source-map' : 'eval-source-map';

// productionの場合、最小化設定を行う。
const plugins = isProduction ? [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),
  // minify. es6はuglifyでのminfy不可
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false,
    },
  }),
  // code-splittingを有効にするプラグイン
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    chunks: ['app'],
    minChunks: Infinity,}),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
] :
  // 開発用設定。
 [
    // hot loadを有効にするためのプラグイン
    new webpack.HotModuleReplacementPlugin(),
];

export default {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    app: './app.ts',
    // code-splitting用の設定
    vendor: ['mithril']
  },
  // distにビルドしたファイルをbundle.jsの名前で保存
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      // .ts, .tsxに一致する拡張子のファイルはts-loaderを通してトランスパイル
      { test: /\.tsx?$/, exclude: /node_modules/, loader: ["babel-loader", "ts-loader"] }
    ]
  },
  // プラグイン設定
  plugins,
  // source-mapを出力して、ブラウザの開発者ツールからデバッグできるようにする。
  devtool,
  // 開発サーバの設定
  devServer: {
    // public/index.htmlをデフォルトのホームとする
    contentBase: './public',
    // バンドルしたファイルを/assets/js/フォルダに出力したものとする。
    publicPath: "/assets/js/",
    // インラインモード
    inline: true,
    // 8080番ポートで起動
    port: 8080,
    // dockerのコンテナ上でサーバを動かすときは以下の設定で全ての接続を受け入れる
    host:"0.0.0.0",
    // hot loadを有効にする
    hot: true,
    // ログレベルをinfoに
    clientLogLevel: "info",
  },
  // vagrantの仕様でポーリングしないとファイルの変更を感知できない
  watchOptions: {
    aggregateTimeout: 300,
    // ５秒毎にポーリング
    poll: 5000
  }
};