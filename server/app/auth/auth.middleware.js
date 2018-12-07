const jwt = require('express-jwt');
const config = require('../../config/config');
const { to, sendError } = require('../services/util.service');
const User = require('../user/user.model');

async function check(req, res, next) {
  const userId = req.user.user_id;
  console.log('Ha ke coucou');

  const [err, user] = await to(User.findOne({ _id: userId }));
  if (err) return sendError(res, 'No user found.');

  req.user = user; // eslint-disable-line
  next();
}

module.exports = [jwt({ secret: config.jwtEncryption }), check];
