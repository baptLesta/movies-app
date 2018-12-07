const express = require('express');
const favoriteCtrl = require('./user.favorite.controller');
const authChecker = require('../../auth/auth.middleware');
const movieChecker = require('../../movie/movie.middleware');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')

  /** TODO GET /api/favorites - Get list of favorites for the connected user*/
  .get(authChecker, favoriteCtrl.list);

router
  .route('/movies/:movieId')

  /** POST /api/favorites - Add new favorite */
  .post(authChecker, movieCheck, favoriteCtrl.add)

  /** POST /api/favorites - Remove favorite */
  .delete(movieChecker, favoriteCtrl.remove);

module.exports = router;
