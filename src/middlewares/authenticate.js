/**
 * Module for the authenticate middleware
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const User = require('../models/userModel');
const createError = require('http-errors');
const authenticate = {};

/**
 * Verify user authentication
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 */
authenticate.user = async (req, res, next) => {
  try {
    console.log('Hello, World!');
  } catch (error) {
    res.status(401).json({
      status: '401: Unauthorized',
      msg: 'Sorry, something went wrong.',
      error: 'Error: ' + error,
    });
  }
};

// Exports
module.exports = authenticate;
