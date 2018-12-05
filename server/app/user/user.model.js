const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const validate = require('mongoose-validator');
const APIError = require('../helpers/APIError');
const bcrypt = require ('bcrypt');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  email: {
    type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true, // eslint-disable-line
    validate: [validate({
      validator: 'isEmail',
      message: 'Not a valid email.',
    })]
  },
  password: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  movies: [{ movie: { 
    type: mangoose.Schema.ObjectId, 
    ref: 'Movie'} 
  }]
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
  comparePassword: (candidatePassword) => {
    const match = await bcrypt.compare(password, this.passwordHash);

    return match;
  }
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
