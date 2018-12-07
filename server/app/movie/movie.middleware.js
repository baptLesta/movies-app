const { to, sendError } = require('../services/util.service');
const Movie = require('./movie.model');

async function check(req, res, next) {
  const movieId = req.params.movieId;

  const [err, movie] = await to(Movie.findOne({ _id: movieId }));
  if (err) return sendError(res, 'No movie with this id found.');

  req.movie = movie; // eslint-disable-line
  next();
}

module.exports = check;
