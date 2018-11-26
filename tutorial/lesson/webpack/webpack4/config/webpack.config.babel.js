import path from 'path';
import {rules} from './webpack/rules';
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MODE = process.env.NODE_ENV === "production" ? "production" : "development";
let filename = "[name].js";
if (MODE == "production" ) {
  // filename = "[name]-[hash].js";
}

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist/assets/js')
}


// entry
const files = {
  pageOne: 'assets/js/page1.js',
  pageTwo: 'assets/js/page2.js'
}

let common = {
  mode: MODE,
  context: opts.src,
  entry: files,
  output: {
      path: opts.dest,
      filename: filename
  },
  resolve: {
      modules: [opts.src, "node_modules"],
      extensions: [".js", ".ts"]
  },
  module: { rules }
};


if (MODE === "development") {
  console.log("Building for dev...");
  module.exports = merge(common, {
    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            { loader: 'elm-hot-webpack-loader' },
            { loader: "elm-webpack-loader",
              options: { debug: true, forceWatch: true }
            }
          ]
        }
      ]
    },
    // 開発サーバの設定
    devServer: {
      contentBase: './dist',
      inline: true,
      port: 8080,
      host:"0.0.0.0",
      hot: true,
      clientLogLevel: "info",
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 5000
    }
  });
}

if (MODE === "production") {
  console.log("Building for Production...");
  module.exports = merge(common, {
    plugins: [
      new MiniCssExtractPlugin({
          //filename: "[name]-[hash].css"
          filename: "[name].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [{ loader: "elm-webpack-loader", options:{optimize: true} } ]
        },
        {
          test: /\.css$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            MiniCssExtractPlugin.loader,
            cssLoader, 
            postCssLoader
          ]
        },
        {
          test: /\.sass$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            MiniCssExtractPlugin.loader, 
            { loader: 'css-loader',
              options: {
                url: false,
                modules: true
              }
            },
            postCssLoader,
            { loader: 'sass-loader' }
          ]
        }
      ]
    }
  });
}
