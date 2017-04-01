var _ = require('lodash');
var util = require('../util');
var logger = require('jsdoc/util/logger');
module.exports = docletModel;

/**
 * ドックレットをレンダリングするためのMustacheテンプレートViewModel。
 * @param  {object} doclet レンダリングするドックレット
 * @return {function}      関数ヘルパー
 */
function docletModel(doclet) {
  return function(context, cb) {
    logger.debug('doclet', doclet);
    var viewModel = _.extend({},
      util.rstMixin,
      util.docletChildren(context, doclet, util.mainDocletKinds),
      // (doclet.kind === 'module' ? {} :
      //   util.docletChildren(context, doclet, util.subDocletKinds)
      // ), {
      util.docletChildren(context, doclet, util.subDocletKinds), {
        doclet: doclet,
        example: util.example
      }
    );
    util.view('doclet.rst', viewModel, cb);
  };
}
