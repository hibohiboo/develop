var _ = require('lodash');
var helper = require('jsdoc/util/templateHelper');
var logger = require('jsdoc/util/logger');

var mainDocletKinds = ['class', 'module', 'external', 'namespace',
  'mixin', 'interface'];
var subDocletKinds = ['function', 'member', 'constant', 'attribute', 'typedef',
  'type'];

module.exports = {
  docletChildren: docletChildren,
  example: example,
  mainDocletKinds: mainDocletKinds,
  subDocletKinds: subDocletKinds
};

/**
 * 指定されたタイプのドックレットの子を検索
 *
 * @param  {object} context jsdocコンテキスト
 * @param  {object} doclet  ドックレットを使用
 * @param  {string} kinds   戻り値の種類 (function, module, ...)
 * @return {array}          パラメータに一致するすべての子ドックレット
 */
function docletChildren(context, doclet, kinds) {
  if (!kinds) {
    kinds = mainDocletKinds;
  }
  var results = {};
  _.each(kinds, function(k) {
    var q = {
      kind: k,
      memberof: doclet ? doclet.longname : {isUndefined: true}
    };
    results[k] = helper.find(context.data, q);
  });
  logger.debug((doclet ? doclet.longname : '<global>'),
               'doclet children',
               'kinds:', kinds,
               'results:', results);
  return results;
}

/**
 * Format a code example.
 * @return {string} the example output
 */
function example() {
  return function(data, render) {
    var output = '.. code-block:: javascript\n';
    var lines = render(data).split('\n');
    logger.debug('line-0', data);
    if (lines.length && lines[0].match(/^<caption>.*<\/caption>$/)) {
      output += '   :caption: ' + lines.shift().slice(9, -10) + '\n';
    }
    output += '\n';
    for (var i = 0; i < lines.length; i++) {
      output += '   ' + lines[i] + '\n';
    }
    return render(output);
  };
}
