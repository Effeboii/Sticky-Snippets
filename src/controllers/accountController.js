/**
 * Module for the accountController
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const accountController = {};
const User = require('../models/userModel');

/**
 * Register a user
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
accountController.register = async (req, res) => {
  try {
    if (req.body.password !== req.body.passwordCheck) {
      throw new Error('Password did not match.');
    }

    await User.insert({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.flash = {
      type: 'success',
      message: 'The user was registered and logged in successfully.',
    };

    req.session.isLoggedIn = true;
    req.session.user = req.body.username;

    res.redirect('/snippets');
  } catch (error) {
    if (error.code === 11000) {
      error = 'This username is already taken.';
    } else if (error.name === 'ValidationError') {
      error = 'Validation error, only certain characters allowed.';
    } else if (error.message === 'Password did not match.') {
      error = 'Password did not match.';
    }

    req.session.flash = {
      type: 'danger',
      message: 'Invalid register attempt.',
      error: error,
    };

    res.redirect('/');
  }
};

/**
 * Authenticates a user
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
accountController.login = async (req, res) => {
  try {
    await User.authenticate(req.body.username, req.body.password);

    req.session.flash = {
      type: 'success',
      message: 'The user was logged in successfully.',
    };

    req.session.isLoggedIn = true;
    req.session.user = req.body.username;

    res.redirect('/snippets');
  } catch (error) {
    res.status(500).json({
      status: '500: Internal Server Error',
      msg: 'Sorry, something went wrong.',
      error: 'Error: ' + error,
    });
  }
};

/**
 * Authenticates a user
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
accountController.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({
      status: '500: Internal Server Error',
      msg: 'Sorry, something went wrong.',
      error: 'Error: ' + error,
    });
  }
};

// Exports
module.exports = accountController;
