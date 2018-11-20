const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MODE = process.env.NODE_ENV === "production" ? "production" : "development";
let filename = "[name].js";
let opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist/assets/js')
}

if (MODE == "production" ) {
  // filename = "[name]-[hash].js";
}

// entry
const files = {
  pageOne: 'assets/js/page1.js',
  pageTwo: 'assets/js/page2.js'
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: (loader) => [require('autoprefixer')()]
  }
};
const cssLoader = { 
  loader: 'css-loader',
  options: {
    url: false   // url()を変換しない
  }
};
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader"}
      },
      {
        test: /\.ts$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader'}
        ] 
      },
      {
        test: /\.css$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader:"style-loader"}, 
          cssLoader,
          postCssLoader
        ]
      },
      {
        test: /\.sass$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',
            options: {
              url: false,
              modules: true
            }
          },
          postCssLoader,
          { loader: 'sass-loader' }
        ]
      },
    ]
  }
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
          filename: "[name]-[hash].css"
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