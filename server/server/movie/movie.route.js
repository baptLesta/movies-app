const express = require('express');
const movieCtrl = require('./movie.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  .get(movieCtrl.get)
  .post(movieCtrl.createBis);

module.exports = router;
