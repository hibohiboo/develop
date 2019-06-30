"use strict";

// #@@range_begin(list1)
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
import { createDecipheriv, scryptSync } from 'crypto';

const password = 'Password used to generate key';
const key = scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0); // Initialization vector.

const server = http.createServer((req, res) => {
  const filename = req.headers.filename;
  const filepath = path.format({
    dir: '/uploads',
    base: filename
  });
  console.log('File request received: ' + filename);



  req
    .pipe(createDecipheriv('aes192', key, iv))
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(filepath))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end('That\'s it\n'); // おしまい！
      console.log(`File saved: ${filepath}`);
    });
});

server.listen(3000, () => console.log('Listening'));
// #@@range_end(list1)
