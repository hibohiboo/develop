import {postCssLoader, cssLoader} from './loaders';
import {getHtmlPlugins} from './plugins';
import webpack  from 'webpack';
export const getDevelopSetting = function(opts) {
  
  const htmlPlugins = getHtmlPlugins(opts); 
  
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          use:  ['html-loader', 'pug-html-loader?pretty&exports=true']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: "babel-loader"}
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      ...htmlPlugins
    ],
    // 開発サーバの設定
    devServer: {
      //contentBase: './dist',
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
}