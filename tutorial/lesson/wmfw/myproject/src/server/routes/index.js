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
import home from '../controllers/home-controller';
import hello from '../controllers/hello-world-controller';
import moviesRouter from '../controllers/movies-controller';


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

// ハローワールド
const helloRouter = express.Router();
helloRouter.get(/\/(index)?$/, hello.index);
helloRouter.get('/welcome', hello.welcome);

router.use('/helloworld', helloRouter);

// 映画
router.use('/movies', moviesRouter);

const routes = router;
export default routes;
