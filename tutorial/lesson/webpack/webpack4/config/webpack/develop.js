const  {postCssLoader, cssLoader} = require( './loaders');
const  {getHtmlPlugins} = require( './plugins');
const  webpack  = require( 'webpack');
module.exports = {getDevelopSetting : function(opts) {
  
  const htmlPlugins = getHtmlPlugins(opts); 
  
  return {
    output: {
      path: opts.dest,
      filename: '[name]-[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use:  ['html-loader?attrs=false','pug-html-loader?pretty&exports=false']
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
}}