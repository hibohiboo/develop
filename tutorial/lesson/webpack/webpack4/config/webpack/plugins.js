import globule from 'globule';
import {opts} from '../webpack.config.babel';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export const getHtmlPlugins = (opts) => {
  const htmlPlugins = [];
  // _で始まるファイルと、_で始まるディレクトリ以下のファイルを無視する
  globule.find({ src: [`**/*.pug`, `!**/_*`], cwd: opts.src})
        .filter(filename=> filename.substring(0, 1) !== '_' && filename.indexOf('/_') === -1)
        .forEach(filename => {
    const name = filename.replace('.pug', '');
    const chunks = [];
    const plugin = new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: `/app/src/${name}.pug`,
      chunks: chunks
    });
    htmlPlugins.push(plugin);
  });
  return htmlPlugins;
}
