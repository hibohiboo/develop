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
    res.render('hello/index', { title: 'Movie List', list: ['zero', 'one', 'two'] });
  }

  /**
   * ウェルカム
   * @param {express.Request} req - リクエストオブジェクト.
   * @param {express.Response} res - レスポンスオブジェクト.
   * @return {undefined}
   */
  static welcome(req, res) {
    let message = 'ウェルカム';
    const { name, numTimes } = req.query;

    if (name && numTimes) {
      message = `ハロー, ${name}, NumTimes is: ${numTimes}`;
    }
    res.send(message);
  }
}

export default HelloWorldController;
