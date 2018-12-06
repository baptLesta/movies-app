const Movie = require('./movie.model');
const { to, sendError, sendSuccess } = require('../services/util.service');

/**
 * Create new movie
 * @property {string} req.body.title - The title of movie.
 * @property {string} req.body.description - The description of movie.
 * @returns {Movie}
 */
async function add(req, res) {
  const movie = req.movie;
  let user = req.user;

  user.movies = [{movie: movie._id}];

  const [err, movie] = await to(User.create(userInfo));
  if (err) return sendError(res, err);

  return sendSuccess(res, { user: user.toWeb() }, 201);
}

/**
 * Get favorite movie list.
 * @property {User} req.user - User connected.
 * @returns {Movie[]}
 */
async function list(req, res) {
  let movies, err;
  const user = req.user;

  [err, movies] = await to(user.Movies()); // eslint-disable-line prefer-const
  if (err) return sendError(res, err, 422);

  movies = movies.map(movie => movie.toWeb());

  return sendSuccess(res, { movies });
}

/**
 * Delete movie from favorite.
 * @returns {Movie}
 */
async function remove(req, res) {
  let err;
  let movie = req.movie;
  let user = req.user;

  [err, user] = await to(user.movies.pull({_id: movie._id})); // eslint-disable-line prefer-const
  if (err) return sendError(res, 'error occured trying to delete the company');

  return sendSuccess(res, { message: 'Deleted favorites' }, 204);
}

module.exports = { load, get, create, update, list, remove };
