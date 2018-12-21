module.exports = {rules: [
  {
    test: /\.pug$/,
    use:  ['html-loader', 'pug-html-loader?pretty&exports=false']
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: { loader: "babel-loader"}
  },
]};

// const test =  [
//   {
//     test: /\.js$/,
//     exclude: /node_modules/,
//     use: { loader: "babel-loader"}
//   },
//   {
//     test: /\.ts$/,
//     use: [
//       { loader: 'babel-loader' },
//       { loader: 'ts-loader'}
//     ] 
//   },
//   {
//     test:    /\.elm$/,
//     exclude: [/elm-stuff/, /node_modules/],
//     use: [{loader: 'elm-webpack-loader', options: {verbose:true, warn:true}}]
//   },
// ]
// }