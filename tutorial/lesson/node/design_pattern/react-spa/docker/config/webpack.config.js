"use strict";

const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "src", "main.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      }
    ]
  }
};
