const express = require('express');
const favoriteCtrl = require('./favorite.controller');
const authCheck = require('../auth/auth.middleware');
const movieCheck = require('../movie/movie.middleware');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/movies')

  /** GET /api/favorites - Get list of favorites for the connected user*/
  .get(authCheck, favoriteCtrl.list);

router
  .route('/movies/:movieId')

  /** POST /api/favorites - Add new favorite */
  .post(...authCheck, movieCheck, favoriteCtrl.add)

  /** POST /api/favorites - Remove favorite */
  .delete(movieCheck, favoriteCtrl.remove);

module.exports = router;
