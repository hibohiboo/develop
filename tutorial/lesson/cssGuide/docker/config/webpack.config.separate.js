const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const MODE = "production";
const filename = MODE === "production" ? "[name]-[hash].js" : "index.js";

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, "separate/pre-dist"),
  dest: path.join(__dirname, "separate/dist/rooper")
};

module.exports = {
  mode: MODE,
  entry: path.join(opts.src, "assets/js/index.js"),
  output: {
    path: opts.dest,
    // spaの場合は、絶対パスにしないと、cssの読み込みやjsの読み込みがルート以外でおかしくなる
    publicPath: "/rooper",
    filename
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(opts.src, "rooper/index.html"),
      inject: "body"
    }),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css"
    }),
    new webpack.DefinePlugin({
      REPRACE_TEST: JSON.stringify(process.env.REPRACE_TEST)
    }),
    new CopyWebpackPlugin(
      [
        {
          from: '**/*',
          to: '../assets/images/',
        },
      ],
      { context: 'src/assets/images' }
    ),
  ],
  resolve: {
    modules: [opts.src, "node_modules"],
    extensions: [".js", ".css", ".png"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: [/elm-stuff/, /node_modules/],
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              url: false
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/font-woff"
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: "file-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [/elm-stuff/, /node_modules/],
        loader: "file-loader"
      }
    ]
  },
  // cdnから読み込むものはここに
  externals: {
    jquery: "jQuery",
    "chart.js": "Chart",
    firebase: "firebase",
    firebaseui: "firebaseui",
    M: "M", // materialize
    moment: "moment"
  },
  // console.log を削除
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true }
        }
      })
    ],
  },
};
