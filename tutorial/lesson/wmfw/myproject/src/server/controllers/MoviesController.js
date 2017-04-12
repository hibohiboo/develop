/**
 * @file MoviesControlelr
 *
 * @module MoviesController
 *
 * @author hibohiboo
 */

import Movie from '../models/Movie';

/** Class Moviesコントローラ. */
class MoviesController {

  /**
   * デフォルト
   * @param {express.Request} req - リクエストオブジェクト.
   * @param {express.Response} res - レスポンスオブジェクト.
   * @return {undefined}
   */
  static index(req, res) {
    const model = new Movie({title:"テストムービー"});
    res.render('movies/index', {title:'Movie List', model:model});
  }
}

export default MoviesController;
