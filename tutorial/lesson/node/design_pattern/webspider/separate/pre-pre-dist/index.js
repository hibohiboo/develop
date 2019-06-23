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
  fs.exists(filename, exists => {
    if (!exists) {
      console.log(`Downloading ${url}`);
      request(url, (err, response, body) => {
        if (err) {
          callback(err);
        }
        else {
          mkdirp(path.dirname(filename), err => {
            if (err) {
              callback(err);
            }
            else {
              fs.writeFile(filename, body, err => {
                if (err) {
                  callback(err);
                }
                else {
                  callback(null, filename, true);
                }
              });
            }
          });
        }
      });
    }
    else {
      callback(null, filename, false);
    }
  });
}
// #@@range_end(list2)
// #@@range_begin(list3)
spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  }
  else if (downloaded) {
    console.log(`Completed the download of "${filename}" ! `);
  }
  else {
    console.log(`"${filename}" was already downloaded ... `);
  }
});
