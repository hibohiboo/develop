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
import log4js  from 'log4js';   // ロガー

import db from '../data/db';

// コントローラクラスのインポート
import HomeController       from '../controllers/home-controller';
import HelloWorldController from '../controllers/hello-world-controller';
import MoviesController      from '../controllers/movies-controller';

const router = express.Router();
const logger = log4js.getLogger('wmfw.router');
const indexReg = /\/(index)?$/;
/**
 * トップページサンプル
 * @name get /
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path Expressが処理するルーティングパス
 * @param {callback} middlewear - Expressのミドルウェア
 */
router.get('/', HomeController.index);

// ホーム
router.get('/home/index',   HomeController.index);
router.get('/home/about',   HomeController.about);
router.get('/home/contact', HomeController.contact);

// ハローワールド
const helloRouter = express.Router();

helloRouter.get(indexReg, HelloWorldController.index);
helloRouter.get('/welcome',    HelloWorldController.welcome);

router.use('/HelloWorldControllerworld', helloRouter);

// 映画
const moviesController = new MoviesController(db); 
router.use('/movies', moviesController.getRouter());

const routes = router;
export default routes;
