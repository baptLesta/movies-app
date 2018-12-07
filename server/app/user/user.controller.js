const User = require('./user.model');
const { to, sendError, sendSuccess } = require('../services/util.service');
const authService = require('../auth/auth.service');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');

/**
 * Load user and append to req.
 */
async function load(req, res, next, id) {
  const userId = req.user.user_id;

  const [err, user] = await to(User.findOne({ _id: userId }));
  if (err) return sendError(res, 'No user found.', httpStatus.NOT_FOUND);

  req.user = user; // eslint-disable-line
  next();
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
  const userInfo = req.body;

  const [err, user] = await to(authService.createUser(userInfo));
  if (err) return sendError(res, err, 422);

  return sendSuccess(res, {
    message: 'Successfully created new user.',
    user: user.toWeb(),
    token: user.getJWT()
  }, 201);
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
async function remove(req, res, next) {
  const user = req.user;

  const [err, user] = await to(User.remove(userInfo));
  if (err) return sendError(res, err, 422);

  return sendSuccess(res, {
    message: 'Successfully removed new user.'
  }, 204);
}

module.exports = { load, get, create, update, list, remove };
