var _ = require('lodash');
var logger = require('jsdoc/util/logger');

/**
 * @module rstMixin
 * rstMixin provide a set of Mustache lambda to help format ReST documents.
 */
module.exports = _.extend({
  pre: pre,
  titlecase: titlecase
}, generateHeading());

/**
 * Mustache lambda that upercase the first letter
 * of each word in the given data.
 *
 * @return {function} the titlecase helper function
 */
function titlecase() {
  return function(data, render) {
    var text = render(data);
    if (text.length === 0) {
      return text;
    }

    return text[0].toUpperCase() + text.substring(1);
  };
}

/**
 * Create a mixin object containing mustache lambda function for heading.
 *
 * The function are named h1 to h[n].
 *
 * @return {function} Mustache lambda
 */
function generateHeading() {
  var mixin = {};
  // If two char are provided, first one is used as upperline of the text.
  _.each(['==', '=', '-', '~', '\''], function(char, idx) {
    // Mustach lambda function takes no parameters and return a function
    // whose signature is data, render.
    // see https://mustache.github.io/mustache.5.html
    mixin['h' + (idx + 1)] = function() {
      return function(data, render) {
        var text = render(data);
        var length = _.last(text.split('\n')).length;
        if (char.length === 2) {
          text = repeatChar(char[1], length) + '\n' + text;
        }
        return text + '\n' + repeatChar(char[0], length);
      };
    };
  });
  return mixin;
}

/**
 * Mustache lambda to preserve whitespace of the given string.
 *
 * @return {function} Mustache lambda
 */
function pre() {
  return function(data, render) {
    // remove first line if empty ; it happens because of
    // the {{pre}} tag on one line.
    logger.debug('empty line:', Boolean(data.match(/^\s+\n/, '')));
    data = data.replace(/^\s+\n/, '');
    // Find the first non-empty lines tabulation
    var m = data.match(/^([ \r\t]+)[^\s]/m);
    if (!m) {
      return render(data);
    }
    var prefix = m[1];
    // remove the prefix from the beginning of all lines before rendering
    data = data.replace(new RegExp('^' + prefix, 'mg'), '');
    var output = render(data);
    output = output.replace(/\n/mg, '\n' + prefix);
    // Depending what kind of content is on the first line, it might
    // or might not keep the spacing...
    // if the first does not contains the pattern, add it
    if (data.substring(0, prefix.length) !== prefix) {
      output = prefix + output;
    }
    return output;
  };
}

/**
 * Repeat the given character n times.
 * Used to format title.
 *
 * @param  {string} char  string of one character
 * @param  {number} times the number of times to repeat char
 * @return {string}       the resulting string
 */
function repeatChar(char, times) {
  return Array(times + 1).join(char);
}
