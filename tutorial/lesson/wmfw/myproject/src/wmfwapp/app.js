/** Express
 * @file Expressサーバの基本設定を行う
 * 
 * @module app
 * @requires express
 * @requires morgan
 * 
 * @author hibohiboo
 */

import express from 'express';
import logger from 'morgan';
import fs from 'fs';
import rfs from 'rotating-file-stream';

const app = express();
// ログ出力ディレクトリ
const logDirectory = '/wmfw/dist/logs';

// ディレクトリが無ければ作成
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// rotating write streamの作成
var accessLogStream = rfs('access.log', {
  interval: '1d', // １日ごとにローテーション
  path: logDirectory
})

// log取得の設定.
app.use(logger('combined', {stream: accessLogStream}));

/**
 * ルートのコントローラ
 * @name get /
 * @function
 * @memberof module:app
 * @inner
 * @param {string} path Expressが処理するルーティングパス
 * @param {callback} middlewear - Expressのミドルウェア
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;

