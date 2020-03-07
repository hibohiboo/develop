const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// // webpack-dev-server で使用
// const fs = require('fs');

// process.env.npm_lifecycle_event : webpackコマンドを実行したnpm script名が格納されている。
const MODE = process.env.npm_lifecycle_event === 'prod' ? 'production' : 'development';
const filename = MODE === 'production' ? '[name]-[hash].js' : '[name].js';


const common = {
  mode: MODE,
  entry: {
    index: './src/assets/js/index.ts',
    // scenario: './src/scenario/assets/js/index.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${filename}`,
    publicPath: "/rooper",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/rooper/index.pug',
      inject: 'body',
      chunks: ['index'],
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.elm', '.scss', '.png', '.ts', '.pug'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
        }],
      },
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
      {
        test: /\.scss$/,
        exclude: [/elm-stuff/, /node_modules/],
        loaders: ['style-loader', 'css-loader?url=false', 'sass-loader'],
      },
      {
        test: /\.css$/,
        exclude: [/elm-stuff/, /node_modules/],
        loaders: ['style-loader', 'css-loader?url=false'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'file-loader',
      },
    ],
  },
  // cdnから読み込むものはここに
  externals: {
    jquery: 'jQuery'
    , 'chart.js': 'Chart'
    , firebase: 'firebase'
    , firebaseui: 'firebaseui'
    //, M: 'M' // materialize
    , moment: 'moment'
    , swiper: 'Swiper'
  },
};

if (MODE === 'development') {
  console.log('Building for dev...');
  module.exports = merge(common, {
    plugins: [
      new webpack.NamedModulesPlugin()
      , new webpack.NoEmitOnErrorsPlugin()
      , new webpack.DefinePlugin({
        REPRACE_TEST: JSON.stringify(process.env.REPRACE_TEST)
      })
    ],
    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            { loader: 'elm-hot-webpack-loader' },
            {
              loader: 'elm-webpack-loader',
              options: {
                debug: true,
                forceWatch: true,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      hot: true,
      progress: true,
      inline: true,
      stats: 'errors-only',
      contentBase: path.join(__dirname, 'src'),
      // publicPath: '/assets/',
      historyApiFallback: {
        rewrites: [
          // { from: /^\/$/, to: '/rooper/index.html' },
          { from: /^\/rooper/, to: '/rooper/index.html' },
        ]
      },
      before(app) {
        app.get('/test', (req, res) => {
          res.json({ result: 'OK' });
        });
        // app.get('/scenario', (req, res) => {
        //   let teset = fs.readFileSync('index.html', 'utf-8');
        //   const data = fs.readFileSync('/scenario/index.html', 'utf-8');

        //   res.writeHead(200, {
        //     'content-Type': 'text/html'
        //   });

        //   // HTTPレスポンスボディを出力する
        //   res.write(data);
        //   res.end("HTML file has already sent to browser");
        // })
      }
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  });
}
