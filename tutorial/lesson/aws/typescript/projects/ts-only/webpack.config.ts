
import * as path from 'path';
import * as globule from 'globule';
import * as Webpack from 'webpack';
import * as nodeExternals  from 'webpack-node-externals';

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'built')
};

/** entryとなるファイル名 */
const ENTRY_NAME = 'index.ts';

/** ビルド種別 */
const BUILD_VARIANT = process.env.NODE_ENV;

const resolveEntry = ()=>{
  const files: any = {};
    globule
    .find([`functions/**/${ENTRY_NAME}`], {cwd: opts.src})
    .forEach((filename) => {
      // filenameには、functions/hello/index.tsのようにマッチしたファイル名が入っている。
      const key = filename.replace('/index.ts', '') // keyが出力されるファイル名となる。
      const value = path.join(opts.src, filename)
      files[key] = value
    })
return files;
};

const config: Webpack.Configuration = {
  target: 'node',
  mode: BUILD_VARIANT === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: resolveEntry(),
  output: {
    filename: '[name].js',
    path: opts.dest,
    library: '[name]',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  externals: [nodeExternals()], // サーバサイドの関数にnode_modulesのライブラリをバンドルする必要はないので除去
};

export default config;