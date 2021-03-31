/**
 * Module for the snippetController
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const snippetController = {};

/**
 * Displays the start page
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
snippetController.read = async (req, res) => {
  try {
    res.render('snippets/index');
  } catch (error) {
    res.status(500).json({
      status: '500: Internal Server Error',
      msg: 'Sorry, something went wrong.',
      error: 'Error: ' + error,
    });
  }
};

// Exports
module.exports = snippetController;
