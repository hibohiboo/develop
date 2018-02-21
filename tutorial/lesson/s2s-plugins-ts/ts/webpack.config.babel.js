import webpack from 'webpack';

export default {
  // nodeのプラグイン
  target: 'node',
  // src以下のソースをビルド対象とする
  context: __dirname + '/src',
  // エントリーポイントとしてapp.jsを起点にビルドする
  entry: {
    s2sReduxActionsRootTsPlugin: './babel-plugin-s2s-redux-actions-root-ts/index.ts',
  },
  output: {
    path: __dirname + '/dist',
		filename: "[name].js",
  },
  // importするときに、以下の配列に登録した拡張子は省略できる
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      // .tsに一致する拡張子のファイルはts-loaderを通してトランスパイル
      { test: /\.ts$/, exclude: /node_modules/, loader: ["babel-loader", "ts-loader"] },
      { test: /\.js$/, exclude: /node_modules/, loader: ["babel-loader"] },
    ]
  },
  // プラグイン設定
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]
};