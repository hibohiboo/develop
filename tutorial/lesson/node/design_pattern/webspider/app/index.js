"use strict"; // #@@range_begin(list1) // ←これは本にコードを引用するためのものです。読者の皆さんは無視してください。

var _request = require("request");

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var utilities = _interopRequireWildcard(require("./utilities"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const mkdirp = require('mkdirp');

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }

  let links = utilities.getPageLinks(currentUrl, body); // ❶

  function iterate(index) {
    if (index === links.length) {
      return callback();
    }

    spider(links[index], nesting - 1, function (err) {
      if (err) {
        return callback(err);
      }

      iterate(index + 1);
    });
  }

  iterate(0); // ❹
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
  (0, _request.get)(url, (err, response, body) => {
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

spider(process.argv[2], 1, err => {
  if (err) {
    console.log(err);
    process.exit();
  } else {
    console.log('Download complete');
  }
});