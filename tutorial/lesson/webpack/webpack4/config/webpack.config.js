const path = require("path");
const merge = require("webpack-merge");

const MODE = process.env.NODE_ENV === "production" ? "production" : "development";
let filename = "[name].js";
let opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist/assets/js')
}

if (MODE == "production" ) {
  filename = "[name]-[hash].js";
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
}
