import {postCssLoader, cssLoader} from './loaders';

export const developSetting = {
    module: {
      rules: [
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
          test: /\.scss$/,
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
            { loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },      
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
