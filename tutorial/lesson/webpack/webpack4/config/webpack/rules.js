import {postCssLoader, cssLoader} from './loaders';

export const rules = [
  {
    test: /\.pug$/,
    use:  ['html-loader', 'pug-html-loader?pretty&exports=false']
  },
];

const test =  [
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
      { loader: 'sass-loader' }
    ]
  },
  {
    test:    /\.elm$/,
    exclude: [/elm-stuff/, /node_modules/],
    use: [{loader: 'elm-webpack-loader', options: {verbose:true, warn:true}}]
  },
];