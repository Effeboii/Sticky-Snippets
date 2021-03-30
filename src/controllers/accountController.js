/**
 * Module for the accountController
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const accountController = {};

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
    res.render('home/index');
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
