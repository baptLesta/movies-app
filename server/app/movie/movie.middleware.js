const { to, sendError } = require('../services/util.service');

async function check(req, res, next) {
  const movieId = req.params.movieId;

  const [err, movie] = await to(Movie.findOne({ id: movieId }));
  if (err) return sendError(res, err);

  req.movie = movie;
  next();
}

module.exports = check;