/**
 * @file HomeControlelr
 *
 * @module HomeController
 * @requires log4js
 *
 * @author hibohiboo
 */

import log4js from 'log4js';   // ロガー

const logger = log4js.getLogger('wmfw.controller.home');

/** Class Homeコントローラ. */
class HomeController {

  /**
   * トップページ
   * @param {express.Request} req - リクエストオブジェクト.
   * @param {express.Response} res - レスポンスオブジェクト.
   * @return {undefined}
   */
  static index(req, res) {
    logger.debug('index start');
    res.render('home/index', { title: 'Home Index' });
  }

  /**
   * アプリケーションについて
   * @param {express.Request} req - リクエストオブジェクト.
   * @param {express.Response} res - レスポンスオブジェクト.
   * @return {undefined}
   */
  static about(req, res) {
    logger.debug('about start');
    const message = 'アプリケーションについての説明';
    res.render('home/about', { title: 'Home About', message });
  }

  /**
   * 連絡先
   * @param {express.Request} req - リクエストオブジェクト.
   * @param {express.Response} res - レスポンスオブジェクト.
   * @return {undefined}
   */
  static contact(req, res) {
    logger.debug('contact start');
    const message = '連絡先';
    res.render('home/contact', { title: 'Home Contact', message });
  }
}

export default HomeController;
