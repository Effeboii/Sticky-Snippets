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
 * Authenticates a user
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
accountController.login = async (req, res) => {
  try {
    res.render('/snippets');
  } catch (error) {
    res.status(500).json({
      status: '500: Internal Server Error',
      msg: 'Sorry, something went wrong.',
      error: 'Error: ' + error,
    });
  }
};

/**
 * Register a user
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
accountController.register = async (req, res) => {
  try {
    const user = await User.insert({
      username: req.body.username,
      password: req.body.password,
    });

    res.status(201).json({
      status: '201: Created',
      message: 'The user was succsessfully registered.',
      id: user.id,
    });

    // res.render('home/index');
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        status: '400: Bad Request',
        message: 'Sorry, something went wrong when trying to register a user.',
        error: '' + error,
      });
    } else if (error.code === 11000) {
      res.status(409).json({
        status: '409: Conflict',
        message: 'Sorry, something went wrong when trying to register a user.',
        error: '' + error,
      });
    }
  }
};

// Exports
module.exports = accountController;
