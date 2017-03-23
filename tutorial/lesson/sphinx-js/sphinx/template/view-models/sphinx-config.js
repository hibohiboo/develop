var helper = require('jsdoc/util/templateHelper');
var util = require('../util');

module.exports = config;

/**
 * The Mustach template to write the default Sphinx config (conf.py) file.
 * @param  {object}   context JSDoc context
 * @param  {Function} cb      called after the view has been generated.
 */
function config(context, cb) {
  var viewModel = {
    package: helper.find(context.data, {kind: 'package'})[0]
  };

  util.view('conf.py', viewModel, cb);
}
