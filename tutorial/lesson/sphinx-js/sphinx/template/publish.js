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
 * @param {TAFFY} taffyData See <http://taffydb.com/>.
 * @param {object} options JSDoc passed options
 * @param {Tutorial} tutorials List of tutorial
 * @return {undefined}
 */
function publish(taffyData, options, tutorials) {
  logger.debug('Tutorials', tutorials);
  logger.debug('Options', options);

  // Use .rst as default extension
  helper.fileExtension = '.rst';

  // README.rst must be kept as it is.
  var readme = _.find(env.opts._, /README.rst/);
  if (readme && !fs.lstatSync(readme).isDirectory()) {
    logger.debug('Load README.rst file:', readme);
    try {
      options.readme = fs.readFileSync(readme);
    } catch (e) {
      logger.debug('No valid README.rst file found.');
    }
  }

  // define a global context that should be available by all function
  context = _.extend({
    data: taffyData
  }, options);

  // Augment data with needed informations
  context.data().each(registerLink);

  _.each(helper.find(context.data, {kind: 'function'}), improveFunc);
  _.each(helper.find(context.data, {kind: 'member'}), improveFunc);

  /**
   * Write the function signature for the current function doclet.
   *
   * @param  {object} doclet function doclet
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

  // build the list of page generation actions.
  var actions = [];
  actions.push(generate(
    helper.getUniqueFilename('index'), require('./view-models/home')));
  // actions.push(generate(
  //   'conf.py', require('./view-models/sphinx-config')));
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
 * Return a function that will asynchronously generate the documentation
 * and write the result.
 * @param  {object} target      the target
 * @param  {function} generator the generator function to use
 * @return {function}           the function that will build this part of the documentation
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
 * Add a link to the link registry.
 * @param  {object} doclet the doclet to create a link for
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
 * Handle all write operations.
 *
 * @private
 * @param {string}   relPath Relative path in the ouput directory
 * @param {string}   data    File content
 * @param {publish.writeCallback} cb node fs.write compatible callback
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
 * Gracefully handle errors in callback.
 * @param  {Function} cb the callback to handle error for
 * @return {any}         the result of cb
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
 * The callback function receive an error as first argument if any.
 *
 * @param {error} err The error cause
 */

/**
 * @callback publish.writeCallback
 * @param {error} err The error cause
 * @param {string} filePath The written file path
 */
