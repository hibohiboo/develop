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

const app = express();

// log取得の設定.
app.use(logger('combined'));

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

