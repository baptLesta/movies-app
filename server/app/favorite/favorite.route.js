const express = require('express');
const favoriteCtrl = require('./favorite.controller');
const authCheck = require('../auth/auth.middleware');
const movieCheck = require('../movie/movie.middleware');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  .user(authCheck)

  /** GET /api/favorites - Get list of favorites for the connected user*/
  .get(favoriteCtrl.list);

router
  .route('/:movieId')
  .user(movieCheck)

  /** POST /api/favorites - Add new favorite */
  .post(favoriteCtrl.add)
  
  /** POST /api/favorites - Remove favorite */
  .delete(favoriteCtrl.remove);

module.exports = router;
