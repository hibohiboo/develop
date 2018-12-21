const path =require( 'path');
const globule = require( 'globule');
const merge  = require( 'webpack-merge');
const {rules} = require( './webpack/rules');
const {getDevelopSetting} = require( './webpack/develop');
const {getProductSetting} = require( './webpack/product');

const MODE = process.env.NODE_ENV === "production" ? "production" : "development";

// ソース・出力先の設定
const opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist')
};
const extensionConversions = {
  scss: 'css',
}

const files = {}
Object.keys(extensionConversions)
  .forEach(from => {
    const to = extensionConversions[from]
    globule
    .find([`assets/**/*.${from}`, `!assets/**/_*.${from}`], {cwd: opts.src})
    .forEach(filename => {
      const key = filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`)
      const value = path.join(opts.src, filename)
      files[key] = value
    })
});

// 開発用・本番用共通設定
let common = {
  entry: files,
  module: { rules },
};

if (MODE === "development") {
  console.log("Building for dev...");
  const developSetting = getDevelopSetting(opts)
  module.exports = merge(common, developSetting);
} else if(MODE === 'production') {
  console.log("Building for Production...");
  const prodcutSetting = getProductSetting(opts);
  module.exports = merge(common, prodcutSetting);
}