var fs = require('fs');
var path = require('canonical-path');
var mustache = require('mustache');
var async = require('async');
var _ = require('lodash');

// Disable HTML escaping
mustache.escape = function(v) {
  return v;
};

module.exports = _.extend({
  rstMixin: require('./rst-mixin'),
  view: view
}, require('./template'));

/**
 * Generate the output string given a template name and the model.
 *
 * @param  {string}       name  the template name without the extension.
 * @param  {object}       model the ViewModel to use with the template
 * @param  {viewCallback} cb callback
 */
function view(name, model, cb) {
  var basePath = path.join(path.dirname(__filename), '../views');
  var render = function(err, files) {
    if (err) {
      cb(err);
    }
    cb(null, mustache.render(files[0], model, {
      toctreeChildren: files[1],
      func: files[2],
      member: files[3],
      constant: files[3],
      typedef: files[5]
    }));
  };
  async.parallel(_.map([
    name,
    '_toctree-children',
    '_function',
    '_member',
    '_member',
    '_typedef'
  ], function(p) {
    return function(cb) {
      fs.readFile(path.join(basePath, p + '.mustache'), 'utf-8', cb);
    };
  }), render);
}

/**
 * @callback viewCallback
 * @param {error} err Error cause
 * @param {string} output Rendered content
 */
