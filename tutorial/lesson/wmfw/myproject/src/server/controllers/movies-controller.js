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
import db from '../data/db';

const moviesRouter = express.Router();

moviesRouter.get(/\/(index)?$/, (req, res) => {
  db.Movie
    .findAll()
    .then((movies) => {
      res.render('movies/index', {
        models: movies,
      });
    });
});

moviesRouter.get('/create', (req, res) => {
  const model = new Movie({ title: 'movie - 新規作成' });
  res.render('movies/edit', { title: 'Movie Create', model });
});

moviesRouter.post('/create', (req, res) => {
  db.Movie.create({
    title: req.body.title,
  }).then(() => {
    res.redirect('/movies/index');
  });
});

const moviesController = moviesRouter;
export default moviesController;
