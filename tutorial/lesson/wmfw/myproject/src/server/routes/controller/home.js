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

/** Class Homeのコントローラ. */
class HomeController{

  /**
   * index
   * @param {express.Request} req - リクエストオブジェクト.
   * @param {express.Response} res - レスポンスオブジェクト.
   * @return {undefined}
   */
  index (req, res) {
    logger.debug('index start');
    res.render('home/index', { title: 'Home Index' });
  }
}

export default HomeController;