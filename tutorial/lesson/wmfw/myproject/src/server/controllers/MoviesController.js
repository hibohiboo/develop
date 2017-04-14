/**
 * @file MoviesControlelr
 *
 * @module MoviesController
 *
 * @author hibohiboo
 */

import express from 'express'; // expressサーバ
import log4js from 'log4js';   // ロガー
import Movie from '../models/Movie';
import models from '../data/models/index';

const moviesRouter = express.Router();

moviesRouter.get(/\/(index)?$/, (req, res)=> {
  models.Movie
    .findAll()
    .then(function(movies) {
      res.render('movies/index', {
        title: 'Sequelize: Express Example',
        models: movies
      });
    });
});

moviesRouter.get('/create', (req, res)=> {
    const model = new Movie({title:"movie - 新規作成"});
    res.render('movies/edit', {title:'Movie Create', model:model});
});

moviesRouter.post('/create', (req, res)=> {
  models.Movie.create({
    title: req.body.title
  }).then(function() {
    res.redirect('/');
  });
});

export default moviesRouter;
