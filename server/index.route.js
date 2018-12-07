const express = require('express');
const userRoutes = require('./app/user/user.route');
const authRoutes = require('./app/auth/auth.route');
const movieRoutes = require('./app/movie/movie.route');
const favoriteRoutes = require('./app/favorite/favorite.route');
const { sendError } = require('./app/services/util.service');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount movies routes at /movies
router.use('/movies', movieRoutes);

// mount favorite routes at /favorites
router.use('/favorites', favoriteRoutes);

router.use((req, res) => {
  if (!req.route) return sendError(res, 'The path of the url match no routes', 404);
});

module.exports = router;
