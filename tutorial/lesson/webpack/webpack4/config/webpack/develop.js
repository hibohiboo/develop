
export const developSetting = {
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
      useLocalIp: true,
      disableHostCheck: true,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 5000
    }
  };
