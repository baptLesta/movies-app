const mongoose = require('mongoose');
// const {TE, to} = require('../services/util.service');
const Promise = require('bluebird');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
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
MovieSchema.methods.toWeb = function () {
  const json = this.toJSON();
  json.id = this._id; // this is for the front end
  return json;
};

/**
 * Statics
 */
MovieSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of Movie.
   * @returns {Promise<Movie, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((movie) => {
        if (movie) {
          return movie;
        }
        const err = new APIError('No such Movie exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Movies in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Movies to be skipped.
   * @param {number} limit - Limit number of Movies to be returned.
   * @returns {Promise<Movie[]>}
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
 * @typedef Movie
 */
module.exports = mongoose.model('Movie', MovieSchema);
