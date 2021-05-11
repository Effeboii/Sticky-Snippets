/**
 * Module for authenticate
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const createError = require('http-errors');
const verify = {};

/**
 * Verify user authentication
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 */
verify.user = async (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return next(createError(401));
  }
};

// Exports
module.exports = verify;
