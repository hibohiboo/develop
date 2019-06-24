"use strict";
// #@@range_begin(list1) // ←これは本にコードを引用するためのものです。読者の皆さんは無視してください。
import { get } from 'request';
import * as fs from 'fs';
import * as path from 'path';
import * as utilities from './utilities';
const mkdirp = require('mkdirp');

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }

  let links = utilities.getPageLinks(currentUrl, body);  // ❶

  function iterate(index) {                              // ❷
    if (index === links.length) {
      return callback();
    }

    spider(links[index], nesting - 1, function (err) {    // ❸
      if (err) {
        return callback(err);
      }
      iterate(index + 1);
    });
  }
  iterate(0);                                            // ❹
}

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return callback(err);
    }
    fs.writeFile(filename, contents, callback);
  });
}

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  get(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }
    saveFile(filename, body, err => {
      if (err) {
        return callback(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      callback(null, body);
    });
  });
}

function spider(url, nesting, callback) {
  const filename = utilities.urlToFilename(url);
  fs.readFile(filename, 'utf8', function (err, body) {
    if (err) {
      if (err.code !== 'ENOENT') {
        return callback(err);
      }

      return download(url, filename, function (err, body) {
        if (err) {
          return callback(err);
        }
        spiderLinks(url, body, nesting, callback);
      });
    }

    spiderLinks(url, body, nesting, callback);
  });
}

spider(process.argv[2], 1, (err) => {
  if (err) {
    console.log(err);
    process.exit();
  } else {
    console.log('Download complete');
  }
});
