const path = require("path");
const merge = require("webpack-merge");

const MODE = process.env.NODE_ENV === "production" ? "production" : "development";
let filename = "[name].js";
let opts = {
  src: path.join(__dirname, 'src/assets/js/'),
  dest: path.join(__dirname, 'dist/assets/js')
}

if (MODE == "production" ) {
  filename = "[name]-[hash].js";
}
// entry
const files = {
  pageOne: 'page1.js',
  pageTwo: 'page2.js'
}
var common = {
  mode: MODE,
  context: opts.src,
  entry: files,
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
          js: {
            test: /[\\/]assets[\\/]js[\\/]/,
            name: 'common',
          }
        }
      }
    },
  });
}
