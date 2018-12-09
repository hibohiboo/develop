import path from 'path';
import globule from 'globule';
import {rules} from './webpack/rules';
import {getHtmlPlugins} from './webpack/plugins';

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist')
};

const files = {}

const htmlPlugins = getHtmlPlugins(opts); 

let common = {
  module: { rules },
  plugins: [...htmlPlugins]
};

module.exports = common;