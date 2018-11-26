import path from 'path';
import globule from 'globule';
import {rules} from './webpack/rules';
const HTMLWebpackPlugin = require("html-webpack-plugin");

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist')
}
console.log('opts', opts)
const files = {}

globule.find([`**/*`], {cwd: opts.src}).forEach(filename => {
  const fullPath = path.join(opts.src, filename);
  console.log(fullPath);
})




let common = {
  module: { rules }
};

module.exports = common;