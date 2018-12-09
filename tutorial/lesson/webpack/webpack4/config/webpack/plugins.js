import globule from 'globule';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export const getHtmlPlugins = (opts) => {
  const htmlPlugins = [];
  /**
   * HtmlWebpackPluginを作成して追加する
   * 
   * @param {string} filename 
   */
  const addPlugins = filename => {
    const name = filename.replace('.pug', '');

    const plugin = new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: `/app/src/${name}.pug`,
    });
    htmlPlugins.push(plugin);
  };
  // _で始まるファイルと、_で始まるディレクトリ以下のファイルを無視する
  globule.find({ src: [`**/*.pug`, `!**/_*`], cwd: opts.src})
        .filter(filename=> filename.substring(0, 1) !== '_' && filename.indexOf('/_') === -1)
        .forEach(addPlugins);
  return htmlPlugins;
}
