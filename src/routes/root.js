/**
 * Module for the root
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const router = require('express').Router();

/**
 * @route   GET
 * @desc    Home
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    res.render('home/index');
  } catch (error) {
    res.status(500).json({
      status: '500: Internal Server Error',
      msg: 'Sorry, something went wrong.',
      error: 'Error: ' + error,
    });
  }
});

// Exports
module.exports = router;
