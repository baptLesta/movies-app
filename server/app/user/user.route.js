const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const authChecker = require('../auth/auth.middleware');
const userCtrl = require('./user.controller');
const favoriteRoutes = require('./favorite/user.favorite.route');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** TODO GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
  /** TOTEST GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** TODO PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** TOTEST DELETE /api/users/:userId - Delete user */
  .delete(authChecker, userCtrl.remove);

// mount favorite routes at /favorites
router.use('/favorites', favoriteRoutes);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
