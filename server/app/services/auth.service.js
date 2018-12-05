const { User } = require('../models/user.model');
// const validator = require('validator');

const {
  to,
  throwError
} = require('../services/util.service');

/**
 * Returns jwt token if valid username and password is provided
 * @property {string} body.uniaueKey
 * @property {string} body.phone
 * @property {string} body.email
 * @returns {string}
 */
function getUniqueKeyFromBody(body) {
  let uniqueKey = body.uniqueKey;
  if (typeof uniqueKey === 'undefined') {
    if (typeof body.email !== 'undefined') {
      uniqueKey = body.email;
    } else if (typeof body.phone !== 'undefined') {
      uniqueKey = body.phone;
    } else {
      uniqueKey = null;
    }
  }

  return uniqueKey;
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function createUser(userInfo) {
  let authInfo;

  authInfo = {}; // eslint-disable-line
  authInfo.status = 'create';

  const uniqueKey = getUniqueKeyFromBody(userInfo);
  if (!uniqueKey) throwError('An email or phone number was not entered.');

  const [err, user] = await to(User.create(userInfo));
  if (err) throwError('User already exists with that email');

  return user;
}

const authUser = async function (userInfo) { //returns token
  let uniqueKey;
  let authInfo = {};
  authInfo.status = 'login';
  uniqueKey = getUniqueKeyFromBody(userInfo);

  if (!uniqueKey) throwError('Please enter an email or phone number to login');


  if (!userInfo.password) throwError('Please enter a password to login');

  let user;
  if (validator.isEmail(uniqueKey)) {
    authInfo.method = 'email';

    [err, user] = await to(User.findOne({
      email: uniqueKey
    }));
    if (err) throwError(err.message);

  } else if (validator.isMobilePhone(uniqueKey, 'any')) { //checks if only phone number was sent
    authInfo.method = 'phone';

    [err, user] = await to(User.findOne({
      phone: uniqueKey
    }));
    if (err) throwError(err.message);

  } else {
    throwError('A valid email or phone number was not entered');
  }

  if (!user) throwError('Not registered');

  [err, user] = await to(user.comparePassword(userInfo.password));

  if (err) throwError(err.message);

  return user;
}

module.exports = {
  getUniqueKeyFromBody,
  createUser
};
