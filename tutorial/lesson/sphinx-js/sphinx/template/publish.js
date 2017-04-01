/* global env */
exports.publish = publish;

var logger = require('jsdoc/util/logger');
var helper = require('jsdoc/util/templateHelper');
var path = require('canonical-path');
var _ = require('lodash');
var deasync = require('deasync');
var fs = require('fs');
var mkdirp = require('mkdirp');
var util = require('./util');
var async = require('async');

var context;

/**
 * @param {TAFFY} taffyData 参照： <http://taffydb.com/>.
 * @param {object} options jsdocに渡すオプション
 * @param {Tutorial} tutorials チュートリアルのリスト
 * @return {undefined}
 */
function publish(taffyData, options, tutorials) {
  logger.debug('Tutorials', tutorials);
  logger.debug('Options', options);

  // デフォルトでは出力ファイルの拡張子に.rstを使用
  helper.fileExtension = '.rst';

  // README.rstはそのまま保持する必要がある
  var readme = _.find(env.opts._, /README.rst/);
  if (readme && !fs.lstatSync(readme).isDirectory()) {
    logger.debug('Load README.rst file:', readme);
    try {
      options.readme = fs.readFileSync(readme);
    } catch (e) {
      logger.debug('No valid README.rst file found.');
    }
  }

  // 全ての関数を使用できるようにするglobal contexの定義
  context = _.extend({
    data: taffyData
  }, options);

  // 必要なデータで拡張する
  context.data().each(registerLink);

  _.each(helper.find(context.data, {kind: 'function'}), improveFunc);
  _.each(helper.find(context.data, {kind: 'member'}), improveFunc);

  /**
   * 現在の関数のドックレットを記述
   *
   * @param  {object} doclet 関数ドックレット
   */
  function improveFunc(doclet) {
    doclet.signature = doclet.name + '(';
    _.each(doclet.params, function(p, i) {
      if (!(p && p.type && p.type.names)) {
        logger.debug('Bad parameter', p, doclet.longname);
        return;
      }
      p.signature = ':param ' +
        p.type && p.type.names && p.type.names.join('|');
      p.signature += ' ' + p.name;

      if (p.optional) {
        doclet.signature += '[';
      }
      if (i > 0) {
        doclet.signature += ', ';
      }
      doclet.signature += p.name;
      if (p.optional) {
        doclet.signature += ']';
      }
      return p.name;
    });
    doclet.signature += ')';

    _.each(doclet.returns, function(r) {
      if (!(r && r.type && r.type.names)) {
        logger.debug('Bad return', r, doclet.longname);
        return;
      }
      r.signature = ':return ' +
        r.type && r.type.names && r.type.names.join('|');
    });
  }

  // ページのリストを作成
  var actions = [];
  actions.push(generate(
    helper.getUniqueFilename('index'), require('./view-models/home')));

  var docletModel = require('./view-models/doclet');
  context.data().each(function(doclet) {
    var url = helper.longnameToUrl[doclet.longname];
    if (url.indexOf('#') !== -1) {
      logger.debug('URL Generator', url, doclet.longname);
      url = helper.longnameToUrl[doclet.longname].split(/#/).pop();
      logger.debug('URL Generated', url);
    }
    if (util.mainDocletKinds.indexOf(doclet.kind) !== -1) {
      actions.push(generate(url, docletModel(doclet)));
    }
  });

  // publish must be synchronous as the caller does not care about callbacks.
  deasync(function(cb) {
    async.parallel(actions, cb);
  })();
}

/**
 * 非同期でドキュメントを作成し、結果を記述する
 * @param  {object} target ターゲット
 * @param  {function} generator 使用するジェネレータ関数
 * @return {function}  ドキュメントを作成する関数の一部
 */
function generate(target, generator) {
  return function(cb) {
    logger.debug('generate', target);
    generator(context, handleErrorCallback(function(err, data) {
      if (err) {
        logger.error('cannot generate ' + target);
        logger.debug(err);
        return;
      }
      write(target, data, cb);
    }));
  };
}

/**
 * リンクレジストリにリンクを追加
 * @param  {object} doclet リンク作成のためのドックレット
 */
function registerLink(doclet) {
  var url = helper.createLink(doclet);
  helper.registerLink(doclet.longname, url);
  doclet.rstLink = url.substr(0, url.length - helper.fileExtension.length);

  // Parent link
  if (!doclet.memberof) {
    return;
  }
  var parent;
  parent = helper.find(context.data, {longname: doclet.memberof});
  if (parent && parent.length > 0) {
    doclet.parentRstLink = parent[0].rstLink;
  }
  // Reference code
  doclet.rstReference = doclet.parentRstLink + '.' + doclet.name;
}

/**
 * 書込処理
 *
 * @private
 * @param {string}   relPath 出力するディレクトリの相対パス
 * @param {string}   data    コンテンツファイル
 * @param {publish.writeCallback} cb node fs.write 互換性のあるコールバック
 * @return {undefined}
 */
function write(relPath, data, cb) {
  var target = path.join(context.destination, relPath);

  mkdirp(path.dirname(target), handleErrorCallback(function() {
    fs.writeFileSync(target, data);
    handleErrorCallback(cb)(null, target);
    logger.debug('file written: %s', target);
  }));
}

/**
 * コールバックのエラーを処理
 * @param  {Function} cb エラー処理を行うコールバック関数
 * @return {any}         コールバック関数の処理結果
 */
function handleErrorCallback(cb) {
  return function(err) {
    if (err) {
      logger.error(err);
      return cb(err);
    }
    return cb.apply(this, arguments);
  };
}

/**
 * @callback errCallback
 * コールバック関数は、もしあれば最初の引数としてエラーを受け取る。
 *
 * @param {error} err エラーの原因
 */

/**
 * @callback publish.writeCallback
 * @param {error} err エラーの原因
 * @param {string} filePath 記述するファイルのパス
 */
