/**
 * Module for the indexRouter
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const router = require('express').Router();
const controller = require('../controllers/homeController');

/**
 * @route   GET
 * @desc    Home
 * @access  Public
 */
router.get('/', controller.home);

// Exports
module.exports = router;
