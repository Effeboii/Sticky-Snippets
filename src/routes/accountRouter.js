/**
 * Module for the accountRouter
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const router = require('express').Router();
const controller = require('../controllers/accountController');

/**
 * @route   POST
 * @desc    Login attempt of a registered user
 * @access  Public
 */
router.post('/login', controller.login);

/**
 * @route   POST
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', controller.register);

// Exports
module.exports = router;
