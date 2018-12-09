import path from 'path';
import merge  from 'webpack-merge';
import {rules} from './webpack/rules';
import {getHtmlPlugins} from './webpack/plugins';
import {developSetting} from './webpack/develop';

const MODE = process.env.NODE_ENV === "production" ? "production" : "development";

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist')
};

const htmlPlugins = getHtmlPlugins(opts); 


let common = {
  module: { rules },
  plugins: [...htmlPlugins]
};

if (MODE === "development") {
  console.log("Building for dev...");
  module.exports = merge(common, developSetting);
  
} else if(MODE === 'production') {
  module.exports = common;
}


