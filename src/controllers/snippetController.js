/**
 * Module for the snippetController
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const snippetController = {};
const Snippet = require('../models/snippetModel');
const UserModel = require('../models/userModel');

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

/**
 * Displays the start page
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
snippetController.new = async (req, res) => {
  try {
    res.render('snippets/new');
  } catch (error) {
    res.status(500).json({
      status: '500: Internal Server Error',
      msg: 'Sorry, something went wrong.',
      error: 'Error: ' + error,
    });
  }
};

/**
 * Displays the start page
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
snippetController.create = async (req, res) => {
  try {
    await Snippet.insert({
      user_id: await UserModel.getId(req.session.user),
      username: req.session.user,
      name: req.body.name,
      description: req.body.description,
      code: req.body.code,
      tag: req.body.tag,
    });

    req.session.flash = {
      type: 'success',
      message: 'The user was registered and logged in successfully.',
    };

    res.redirect('/snippets');
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
