/**
 * Module for the userModel
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const isUsername = (str) => /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(str);

// Create a schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: [true, 'Trims whitespaces at the end.'],
      unique: [true, 'Username must be unique.'],
      required: [true, 'Username is required.'],
      minlength: [6, 'Must have minimum of 6 characters.'],
      maxlength: [20, 'No more than 20 characters allowed.'],
      validate: [isUsername, 'Only certain characters allowed.'],
    },
    password: {
      type: String,
      trim: [true, 'Trims whitespaces at the end.'],
      required: [true, 'User password is required.'],
      minlength: [6, 'Must have a minimum of 10 characters.'],
      maxlength: [64, 'No more than 64 characters allowed.'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Salts and hashes password before save
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Authenticates a user
 *
 * @param {String} username - ...
 * @param {String} password - ...
 * @returns {Promise<User>} - The promise to be fulfilled
 */
UserSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username });

  // If no user is found or the password is wrong, throw an error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password!.');
  }

  return user;
};

/**
 * Gets a user by ID
 *
 * @param {string} username - The value of the username for the user to get
 * @returns {Promise<User>} The Promise to be fulfilled
 */
UserSchema.statics.getById = async function (username) {
  const user = await this.findOne({ username });

  if (!user) {
    throw new Error('');
  }

  return user._id;
};

/**
 * Inserts a new user
 *
 * @param {object} userData - ...
 * @param {string} userData.username - ...
 * @param {string} userData.password - ...
 * @returns {Promise<User>} - ...
 */
UserSchema.statics.insert = async function (userData) {
  const user = new UserModel(userData);
  return user.save();
};

// Creates a model using the schema
const UserModel = mongoose.model('User', UserSchema);

// Exports
module.exports = UserModel;
