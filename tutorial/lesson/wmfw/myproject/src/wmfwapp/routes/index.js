/** 
 * @file ルーティングを行う
 * 
 * @module router
 * @requires express
 * @requires morgan
 * 
 * @author hibohiboo
 */

import express from 'express'; // expressサーバ
import log4js from 'log4js';   // ロガー

const router = express.Router();
const logger = log4js.getLogger('wmfw.router');

/**
 * ルートのコントローラ
 * @name get /
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path Expressが処理するルーティングパス
 * @param {callback} middlewear - Expressのミドルウェア
 */
router.get('/', (req, res) => {
  logger.debug('trace log4js');
  res.send('Hello World!');
});


module.exports = router;
