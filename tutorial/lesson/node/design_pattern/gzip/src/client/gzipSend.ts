
"use strict";

// #@@range_begin(list1)
const fs = require('fs');
const zlib = require('zlib');
const http = require('http');
const path = require('path');
import { createCipheriv, scryptSync } from 'crypto';

const file = process.argv[2];
const server = process.argv[3];

const options = {
  hostname: server,
  port: 3000,
  path: '/',
  method: 'PUT',
  headers: {
    filename: path.basename(file),
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip'
  }
};

const req = http.request(options, res => {
  console.log('Server response: ' + res.statusCode);
});

const password = 'Password used to generate key';
const key = scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0); // Initialization vector.

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(createCipheriv('aes192', key, iv))
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully sent'); // 送信成功
  });
// #@@range_end(list1)

