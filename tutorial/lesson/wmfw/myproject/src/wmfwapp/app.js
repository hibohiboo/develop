/** Express
 * @module app
 * @requires express
 */

/**
 * express module
 * @const
 */
import express from 'express';

const app = express();

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

