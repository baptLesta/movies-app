const Movie = require('./movie.model');

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
  return res.json(req.movie);
}

/**
 * Create new movie
 * @property {string} req.body.title - The title of movie.
 * @property {string} req.body.description - The description of movie.
 * @returns {Movie}
 */
function create(req, res, next) {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description
  });

  movie.save()
    .then(savedMovie => res.json(savedMovie))
    .catch(e => next(e));
}

/**
 * Update existing movie
 * @property {string} req.body.title - The title of movie.
 * @property {string} req.body.description - The description of movie.
 * @returns {Movie}
 */
function update(req, res, next) {
  const movie = req.movie;
  movie.title = req.body.title;
  movie.description = req.body.description;

  movie.save()
    .then(savedMovie => res.json(savedMovie))
    .catch(e => next(e));
}

/**
 * Get movie list.
 * @property {number} req.query.skip - Number of movies to be skipped.
 * @property {number} req.query.limit - Limit number of movies to be returned.
 * @returns {Movie[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Movie.list({ limit, skip })
    .then(movies => res.json(movies))
    .catch(e => next(e));
}

/**
 * Delete movie.
 * @returns {Movie}
 */
function remove(req, res, next) {
  const movie = req.movie;
  movie.remove()
    .then(deletedMovie => res.json(deletedMovie))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
