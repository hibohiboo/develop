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

class MoviesController {

  constructor(db){
    this.db = db;
  }

  getRouter(){
    const router = express.Router();

    // 関数で使用するthisをインスタンスと紐付けるためにbindを使用
    router.get(/\/(index)?$/, this.getIndex.bind(this));
    router.get('/create',     this.getCreatem);
    router.post('/create',    this.postCreate.bind(this));
    return router;
  }

  getIndex (req, res){
    this.db.Movie
      .findAll()
      .then((movies) => {
        res.render('movies/index', {
          models: movies,
        });
      });
  }


  getCreate (req, res) {
      const model = new Movie({ title: 'movie - 新規作成' });
      res.render('movies/edit', { title: 'Movie Create', model });
  }

  postCreate (req, res) {
      this.db.Movie.create({
        title: req.body.title,
      }).then(() => {
        res.redirect('/movies/index');
      });
  }
}
export default MoviesController;