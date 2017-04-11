/** 
 * @file ルーティングを行う
 * 
 * @module router
 * @requires express
 * @requires log4js
 * 
 * @author hibohiboo
 */

import express from 'express'; // expressサーバ
import log4js from 'log4js';   // ロガー

// コントローラクラスのインポート
import HomeController from './controller/home.js';

// コントローラのインスタンス化
const home = new HomeController();

const router = express.Router();
const logger = log4js.getLogger('wmfw.router');

/**
 * トップページ
 * @name get /
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path Expressが処理するルーティングパス
 * @param {callback} middlewear - Expressのミドルウェア
 */
router.get('/', (req, res) => {
    logger.debug('index start');
    res.render('home/index', { title: 'トップページ' });
});

// ホーム
router.get('/home/index', home.index);
router.get('/home/about', home.about);
router.get('/home/contact', home.contact);

module.exports = router;
