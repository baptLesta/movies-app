const User = require('../user.model');
const { to, sendError, sendSuccess } = require('../../services/util.service');

/**
 * Create new movie
 * @property {string} req.body.title - The title of movie.
 * @property {string} req.body.description - The description of movie.
 * @returns {Movie}
 */
async function add(req, res) {
  const movie = req.movie;
  let err;
  let user = req.user;

  user.movies = [{ movie: movie._id }];
  console.log(user);

  [err, user] = await to(User.create(user));
  if (err) return sendError(res, err);

  return sendSuccess(res, { user: user.toWeb() }, 201);
}

/**
 * Get favorite movie list.
 * @property {User} req.user - User connected.
 * @returns {Movie[]}
 */
async function list(req, res) {
  const user = req.user;

  let movies = user.movies;
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

  [err, user] = await to(user.movies.pull({ _id: movie._id })); // eslint-disable-line prefer-const
  if (err) return sendError(res, 'Error occured trying to delete the company.');

  return sendSuccess(res, { message: 'Favorite removed.' }, 204);
}

module.exports = { add, list, remove };
