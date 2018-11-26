import path from 'path';
import globule from 'globule';
import {rules} from './webpack/rules';
const HTMLWebpackPlugin = require("html-webpack-plugin");

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist')
}
const files = {}

globule.find({src: [`**/*`], cwd: opts.src, prefixBase: true}).forEach(filepath => {
  console.log(filepath);
})




let common = {
  module: { rules }
};

module.exports = common;