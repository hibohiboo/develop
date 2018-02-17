import webpack from 'webpack';

// 環境変数から本番環境を判断。
const isProduction = process.env.NODE_ENV === 'production';

// source-map : 正確・最小限。コンパイル速度低
// eval-source-map: 正確。コンパイル速度低。再作成速度中。
const devtool = isProduction ? 'source-map' : 'eval-source-map';

// productionの場合
const plugins = isProduction ? 
[
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),
  // code-splittingを有効にするプラグイン
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.js",
    minChunks: Infinity,}),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  // minimize
  new webpack.optimize.UglifyJsPlugin()
] :
  // 開発用設定。
[
];

export default {
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    campForm: './app.tsx',
    // code-splitting用の設定
    vendor: ['react', 'react-dom', 'redux', 'redux-actions', 'redux-saga', 'redux-logger', 'babel-polyfill', 
             'react-redux', 'redux-form', 'i18next', 'firebase', 'react-router-redux', 'history', 'react-router-dom']
  },
  output: {
    path: __dirname + '/dist',
		filename: "[name].js",
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".yml"]
  },
  module: {
    rules: [
      // .ts, .tsxに一致する拡張子のファイルはts-loaderを通してトランスパイル
      { test: /\.tsx?$/, exclude: /node_modules/, loader: ["babel-loader", "ts-loader"] },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: ["babel-loader"] },
      { test: /\.yml$/, loaders: ['json-loader', 'yaml-loader']},
      { test: /\.json$/, loader: ["json-loader"]}
    ]
  },
  // プラグイン設定
  plugins,
  // source-mapを出力して、ブラウザの開発者ツールからデバッグできるようにする。
  devtool,
  // vagrantの仕様でポーリングしないとファイルの変更を感知できない
  watchOptions: {
    aggregateTimeout: 300,
    // ５秒毎にポーリング
    poll: 5000
  }
};