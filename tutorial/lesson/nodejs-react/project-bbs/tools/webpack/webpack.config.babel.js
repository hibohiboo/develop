import path from 'path';

export default {
  entry:  path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
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
