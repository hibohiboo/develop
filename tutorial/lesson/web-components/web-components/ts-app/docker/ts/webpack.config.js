const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

// process.env.npm_lifecycle_event : webpackコマンドを実行したnpm script名が格納されている。
const MODE = process.env.npm_lifecycle_event === 'prod' ? 'production' : 'development';
const filename = 'tsApp.js';

const common = {
  mode: MODE,
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename,
  },
  plugins: [
    // new HTMLWebpackPlugin({
    //   // Use this template to get basic responsive meta tags
    //   template: '../index.html',
    //   // inject details of output file at end of body
    //   inject: 'body',
    // }),
  ],
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      // {
      //   test: /\.scss$/,
      //   exclude: [/elm-stuff/, /node_modules/],
      //   loaders: ['style-loader', 'css-loader?url=false', 'sass-loader'],
      // },
      // {
      //   test: /\.css$/,
      //   exclude: [/elm-stuff/, /node_modules/],
      //   loaders: ['style-loader', 'css-loader?url=false'],
      // },
      // {
      //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   exclude: [/elm-stuff/, /node_modules/],
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     mimetype: 'application/font-woff',
      //   },
      // },
      // {
      //   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   exclude: [/elm-stuff/, /node_modules/],
      //   loader: 'file-loader',
      // },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   exclude: [/elm-stuff/, /node_modules/],
      //   loader: 'file-loader',
      // },
    ],
  },
  // cdnから読み込むものはここに
  externals: {
  },
};

if (MODE === 'development') {
  console.log('Building for dev...');
  module.exports = merge(common, {
    plugins: [
      // Suggested for hot-loading
      new webpack.NamedModulesPlugin()
      // Prevents compilation errors causing the hot loader to lose state
      , new webpack.NoEmitOnErrorsPlugin()
      , new webpack.DefinePlugin({
        GOOGLE_SHEET_API_KEY: JSON.stringify(process.env.GOOGLE_SHEET_API_KEY)
      })
    ],
    devServer: {
      host: '0.0.0.0',
      port: 8080,
      hot: true,
      progress: true,
      inline: true,
      stats: 'errors-only',
      contentBase: path.join(__dirname, '../'),
      historyApiFallback: true,
      // feel free to delete this section if you don't need anything like this
      before(app) {
        // on port 3000
        app.get('/test', (req, res) => {
          res.json({ result: 'OK' });
        });
      },
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  });
}
