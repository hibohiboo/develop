"use strict";

const levelup = require('level');
import fsAdapter from './fsAdapter';

const db = levelup('./fsDB', { valueEncoding: 'binary' });
const fs = fsAdapter(db);

fs.writeFile('file.txt', 'Hello!', () => {
  fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
    console.log(res);
  });
});

//try to read a missing file
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.log(err);
});
