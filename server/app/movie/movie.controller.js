const Movie = require('./movie.model');
const { to, sendError, sendSuccess } = require('../services/util.service');

/**
 * Load movie and append to req.
 */
function load(req, res, next, id) {
  Movie.get(id)
    .then((movie) => {
      req.movie = movie; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get movie
 * @returns {Movie}
 */
function get(req, res) {
  let movie = req.movie;
  return sendResponse(res, { movie: movie.toWeb() });
}

/**
 * Create new movie
 * @property {string} req.body.title - The title of movie.
 * @property {string} req.body.description - The description of movie.
 * @returns {Movie}
 */
async function create(req, res) {
  const movieInfo = req.body;

  const [err, movie] = await to(Movie.create(movieInfo));
  if (err) return sendError(res, err, 422);

  return sendSuccess(res, { movie: movie.toWeb() }, 201);
}

/**
 * Update existing movie
 * @property {string} req.body.title - The title of movie.
 * @property {string} req.body.description - The description of movie.
 * @returns {Movie}
 */
async function update(req, res, next) {
  const err;

  let movie = req.movie;
  const data = req.body;
  movie.set(data);

  [err, movie] = await to(movie.save());
  if (err) return sendError(res, err);

  return sendSuccess(res, { movie: movie.toWeb() });
}

/**
 * Get movie list.
 * @property {number} req.query.skip - Number of movies to be skipped.
 * @property {number} req.query.limit - Limit number of movies to be returned.
 * @returns {Movie[]}
 */
async function list(req, res) {
  let movies, err;
  [err, movies] = await to(Movie.find());
  if (err) return sendError(res, err, 422);

  movies = movies.map(movie => movie.toWeb());

  return sendSuccess(res, { movies });
}

/**
 * Delete movie.
 * @returns {Movie}
 */
function remove(req, res) {
  let company, err;
  company = req.company;

  [err, company] = await to(company.remove());
  if(err) return sendError(res, 'error occured trying to delete the company');

  return sendSuccess(res, {message:'Deleted Company'}, 204);
}

module.exports = { load, get, create, update, list, remove };
