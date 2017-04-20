/**
 * @file MoviesControlelr
 *
 * @module MoviesController
 *
 * @author hibohiboo
 */

import express from 'express';       // expressサーバ
import log4js from 'log4js';         // ロガー
import Movie from '../models/movie';

const logger = log4js.getLogger('wmfw.controller.movies');

/** Class Movieコントローラ. */
class MoviesController {
  /**
   * @param  {db} db Sqqualizeのdbモデル
   */
  constructor(db){
    this.db = db;
  }

  createRouter(){
    const router = express.Router();

    // 関数で使用するthisをインスタンスと紐付けるためにbindを使用
    router.get(/^\/(index)?$/, this.getIndex.bind(this));
    router.get('/create',     this.getCreate.bind(this));
    router.post('/create',    this.postCreate.bind(this));
    router.get('/edit/:id',   this.getEdit.bind(this));
    return router;
  }

  /**
   * 一覧を表示する
   * 
   * @param  {Request} req リクエストオブジェクト
   * @param  {Response} res レスポンスオブジェクト
   */
  getIndex (req, res){
    this.db.Movie
      .findAll()
      .then((movies) => {
        res.render('movies/index', {
          models: movies,
        });
      });
  }

  /**
   * 情報新規作成画面を表示する
   * 
   * @param  {Request} req リクエストオブジェクト
   * @param  {Response} res レスポンスオブジェクト
   */
  getCreate (req, res) {
      const model = new Movie({ title: 'movie - 新規作成' });
      res.render('movies/edit', { title: 'Movie Create', model });
  }
  /**
   * DBにMovieの情報を登録する
   * 
   * @param  {Request} req リクエストオブジェクト
   * @param  {Response} res レスポンスオブジェクト
   */
  postCreate (req, res) {
      this.db.Movie.create(req.body).then(() => {
        res.redirect('/movies/index');
      });
  }

  /**
   * 編集画面を表示する
   * 
   * @param  {Request} req リクエストオブジェクト
   * @param  {Response} res レスポンスオブジェクト
   * @param  {Next}     next next関数
   * @param  {string}   id URLから取得したID
   */
  getEdit (req, res) {
    const {id} = req.params;
    this.db.Movie
      .findOne({
        where: {id: id},
        attributes: ['id', 'title', ['releaseDate', 'releaseDate'], 'genre', 'price']
      })
      .then((movie) => {
        logger.debug(movie);
        res.render('movies/edit', { title: 'Movie Edit', model:movie.dataValues });
      });
  }

}
export default MoviesController;