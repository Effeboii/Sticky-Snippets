/**
 * Module for the snippetController
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const snippetController = {};
const Snippet = require('../models/snippetModel');
const User = require('../models/userModel');
const moment = require('moment');

/**
 * Displays the start page
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
snippetController.read = async (req, res) => {
  try {
    const viewData = {
      snippets: (await Snippet.find({})).map((snippet) => ({
        id: snippet._id,
        tag: snippet.tag,
        name: snippet.name,
        description: snippet.description,
        code: snippet.code,
        date: snippet.createdAt,
        author: snippet.username,
      })),
    };

    res.render('snippets/index', { viewData });
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
      user_id: await User.getById(req.session.user),
      username: req.session.user,
      name: req.body.name,
      description: req.body.description,
      code: req.body.code,
      tag: req.body.tag,
    });

    req.session.flash = {
      type: 'success',
      message: 'Snippet successfully added!',
    };

    res.redirect('/snippets');
  } catch (error) {
    req.session.flash = {
      type: 'danger',
      message: 'Something went wrong. ' + error.message,
    };
    res.redirect('/snippets/new');
  }
};

/**
 * Displays the start page
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
snippetController.single = async (req, res) => {
  try {
    const viewData = {
      snippet: await Snippet.findOne({ _id: req.params.id }).lean(),
      owner: false,
    };

    if (viewData.snippet.username === req.session.user) {
      viewData.owner = true;
    }

    res.render('snippets/view', { viewData });
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
snippetController.delete = async (req, res) => {
  try {
    await Snippet.deleteOne({ _id: req.params.id });

    req.session.flash = {
      type: 'success',
      message: 'Snippet successfully deleted!',
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

/**
 * Displays the start page
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
snippetController.edit = async (req, res) => {
  try {
    const viewData = {
      snippet: await Snippet.findOne({ _id: req.params.id }).lean(),
      owner: false,
    };

    if (viewData.snippet.username === req.session.user) {
      viewData.owner = true;
    }

    res.render('snippets/edit', { viewData });
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
snippetController.update = async (req, res) => {
  try {
    console.log('hej');

    // const update = {
    //   name: req.body.name,
    //   description: req.body.description,
    //   code: req.body.code,
    //   tag: req.body.tag,
    // };

    // await Snippet.findByIdAndUpdate(
    //   req.params.id,
    //   { $set: update },
    //   { new: true }
    // );

    // res.redirect('/snippets');
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
