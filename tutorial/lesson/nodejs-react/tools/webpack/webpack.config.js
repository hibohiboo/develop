module.exports = {
  entry: './src/react/App.test.js',
  output: {
    filename: './dist/react/App.test.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}