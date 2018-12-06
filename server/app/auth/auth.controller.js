const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');
const { throwError, to, sendSuccess } = require('../services/util.service');

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res, next) {
  const userInfo = req.body;
  const { password, email } = userInfo;
  let candidateUser, user, err;

  [err, candidateUser] = await to(User.findOne({ email }));
  if (err) throwError('No user find with this email.');

  [err, user] = await to(candidateUser.comparePassword(password));
  if (err) throwError('Wrong password.');

  return sendSuccess(res, {
    message: 'Successfully login.',
    user: user.toWeb(),
    token: user.getJWT()
  }, 201);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber };
