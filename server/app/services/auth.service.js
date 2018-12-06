const User = require('../user/user.model');
// const validator = require('validator');
const bcrypt = require('bcrypt');
const {
  to,
  throwError
} = require('../services/util.service');

/**
* Returns jwt token if valid username and password is provided
* @property {string} userInfo.email
* @property {string} userInfo.password
* @returns {User}
*/
async function createUser(userInfo) {
  const saltRounds = 10;
  const { email, password } = userInfo;
  let authInfo, err, hash, user;

  let existingUser;
  [err, existingUser] = await to(User.findOne({ email }));
  if (existingUser) throwError('That email is already use.');

  [err, hash] = await to(
    bcrypt.hash(password, saltRounds)
  );
  if (err) throwError('Error occurs during the hash of the password.');
  userInfo.password = hash;

  [err, user] = await to(User.create(userInfo));
  if (err) throwError('Error occurs during create the user in mongo');

  return user;
}

module.exports = {
  createUser
};
