const path = require("path");
const merge = require("webpack-merge");

const MODE = process.env.NODE_ENV === "production" ? "production" : "development";
let filename = "[name].js";
let opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist')
}

if (MODE == "production" ) {
  filename = "[name]-[hash].js";
  opts = {
    src: path.join(__dirname, 'dist'),
    dest: path.join(__dirname, 'product')
  }
}

var common = {
  mode: MODE,
  context: opts.src,
  entry: {

  },
  output: {
      path: opts.dest,
      filename: filename
  },
  resolve: {
      modules: [opts.src, "node_modules"],
      extensions: [".js"]
  },
  module: {
      rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }
      ]
  }
};

if (MODE === "production") {
  console.log("Building for Production...");
  module.exports = merge(common, {
    // 共通部分をまとめる
    optimization: {
      splitChunks: {
        // cacheGroups内にバンドルの設定を複数記述できる
        cacheGroups: {
          // 今回はvendorだが、任意の名前で問題ない
          vendor: {
            // node_modules配下のモジュールをバンドル対象とする
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true
          },
          elm: {
            test: /[\\/]assets[\\/]elm[\\/]/,
            name: 'common-elm',
          }
        }
      }
    },
  });
}
