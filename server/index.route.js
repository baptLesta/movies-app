const express = require('express');
const userRoutes = require('./app/routes/user.route');
const authRoutes = require('./app/auth/auth.route');
const movieRoutes = require('./app/routes/movie.route');

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

module.exports = router;
