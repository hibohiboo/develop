"use strict";
// #@@range_begin(list1) // ←これは本にコードを引用するためのものです。読者の皆さんは無視してください。
import * as request from 'request';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as utilities from './utilities';
// #@@range_end(list1)

// #@@range_begin(list2)
function spider(url, callback) {
  const filename = utilities.urlToFilename(url);
  fs.exists(filename, exists => {        // ❶
    if (exists) {
      return callback(null, filename, false);
    }
    download(url, filename, err => {
      if (err) {
        return callback(err);
      }
      callback(null, filename, true);
    })
  });
}
// #@@range_end(list2)

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {      // ❷
    if (err) {
      return callback(err);
    }
    saveFile(filename, body, err => {
      if (err) {
        return callback(err);
      }
      console.log(`Download  and saved: ${url}`);
      callback(null, body);
    });
  });
}
function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {    // ❸
    if (err) {
      return callback(err);
    }
    fs.writeFile(filename, contents, callback);
  });

}
// #@@range_begin(list3)
spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}" ! `);
  } else {
    console.log(`"${filename}" was already downloaded .. `);
  }
});
// #@@range_end(list3)
