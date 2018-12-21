const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {getHtmlPlugins} =  require('./plugins');
const {postCssLoader, cssLoader} = require('./loaders');

module.exports = { getProductSetting : function(opts) {
  
  const htmlPlugins = getHtmlPlugins(opts); 
  
  return {
    output: {
      path: opts.dest,
      filename: '[name]-[hash].js'
    },
    module: {
      rules: [
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
          test: /\.scss$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            MiniCssExtractPlugin.loader, 
            cssLoader,
            postCssLoader,
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name]-[hash].css",
        chunkFilename: "assets/css/[id].css"
        //filename: "[name].css"
      }),
      ...htmlPlugins
    ],
  };
}}
