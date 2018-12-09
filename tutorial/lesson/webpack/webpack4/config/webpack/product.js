import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {getHtmlPlugins} from './plugins';
import {postCssLoader, cssLoader} from './loaders';

export const getProductSetting = function(opts) {
  
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
        // assets/cssまで含めないと、cssディレクトリにjsファイルができてしまう
        filename: "assets/css/[name]-[hash].css",
        chunkFilename: "assets/css/[id].css"
        //filename: "[name].css"
      }),
      ...htmlPlugins
    ],
  };
}
