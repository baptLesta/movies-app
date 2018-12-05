const { User } = require('../models/user.model');
// const validator = require('validator');
const bcrypt = require('bcrypt');

const {
  to,
  throwError
} = require('../services/util.service');

/**
* Returns jwt token if valid username and password is provided
* @param req
* @param res
* @param next
*@returns {*}
*/
async function createUser(userInfo) {
  const saltRounds = 10;

  let authInfo, err;
  const { email, password } = userInfo;

  const [err, existingUser] = await to(User.findOne({email}));
  if (existingUser) throwError('That email is already use.');

  const [err, hash] = await to(
    bcrypt.hash(password, saltRounds)
  );
  if (err) throwError('Error occurs during the hash of the password.');

  const [err, user] = await to(User.create(userInfo));
  if (err) throwError('Error occurs during create the user in mongo');

  return user;
}

/**
* Returns jwt token if valid username and password is provided
* @param req
* @param res
* @param next
* @returns {User}
*/
async function authUser(userInfo) {
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