var fs = require('fs');
var path = require('canonical-path');
var mustache = require('mustache');
var async = require('async');
var _ = require('lodash');

// HTMLエスケープを無効化
mustache.escape = function(v) {
  return v;
};

module.exports = _.extend({
  rstMixin: require('./rst-mixin'),
  view: view
}, require('./template'));

/**
 * テンプレート名とモデルを指定して出力文字列
 *
 * @param  {string}       name 拡張子を覗いたテンプレート名
 * @param  {object}       model テンプレートで使用するビューモデル
 * @param  {viewCallback} cb コルバック関数
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
