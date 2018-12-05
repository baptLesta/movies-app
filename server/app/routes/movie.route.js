const express = require('express');
const movieCtrl = require('../controllers/movie.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  .get(movieCtrl.list)
  .post(movieCtrl.create);

router
  .route('/:movie_id')
  .get(movieCtrl.get);

module.exports = router;
