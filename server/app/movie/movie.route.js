const express = require('express');
const movieCtrl = require('./movie.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  /** GET /api/movies - Get list of movies */
  .get(movieCtrl.list)

  /** POST /api/movies - Create new movie */
  .post(movieCtrl.create);

router
  .route('/:movie_id')

  /** GET /api/movies/:movieId - Get movie */
  .get(movieCtrl.get);

module.exports = router;
