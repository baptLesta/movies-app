const User = require('./user.model');
const { to, sendError, sendSuccess } = require('../services/util.service');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
async function create(req, res, next) {
  // ME
  const {
    email,
    firstName,
    lastName,
    password
  } = req.body;

  if (!email) {
    return sendError(res, 'Please enter an email or phone number to register.');
  } else if (!password) {
    return sendError(res, 'Please enter a password to register.');
  } else if (!firstName || !lastName) {
    return sendError(res, 'Please enter your full name.');
  }
  const [err, user] = await to(authService.createUser(req.body));

  if (err) return sendError(res, err, 422);
  return sendSuccess(res,
    {
      message: 'Successfully created new user.',
      user: user.toWeb(),
      token: user.getJWT()
    },
  201);
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
