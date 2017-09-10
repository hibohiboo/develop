export default {
  entry: './src/react/App.test.js',
  output: {
    filename: './dist/react/App.test.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}