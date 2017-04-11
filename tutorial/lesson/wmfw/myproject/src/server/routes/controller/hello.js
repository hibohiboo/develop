/**
 * @file HelloWorldControlelr
 *
 * @module HelloWorldController
 *
 * @author hibohiboo
 */

/** Class HelloWorldコントローラ. */
class HelloWorldController {

  /**
   * デフォルト
   * @param {express.Request} req - リクエストオブジェクト.
   * @param {express.Response} res - レスポンスオブジェクト.
   * @return {undefined}
   */
  static index(req, res) {
    res.send('デフォルト');
  }

  /**
   * ウェルカム
   * @param {express.Request} req - リクエストオブジェクト.
   * @param {express.Response} res - レスポンスオブジェクト.
   * @return {undefined}
   */
  static welcome(req, res) {
    res.send('ウェルカム');
  }
}

export default HelloWorldController;
