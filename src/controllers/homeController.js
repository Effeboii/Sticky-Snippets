/**
 * Module for the homeController
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const homeController = {};

/**
 * Displays the start page
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
homeController.home = async (req, res) => {
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
module.exports = homeController;
