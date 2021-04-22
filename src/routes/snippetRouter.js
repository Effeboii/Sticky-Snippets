/**
 * Module for the snippetRouter
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const router = require('express').Router();
const controller = require('../controllers/snippetController');

/**
 * @route   GET
 * @desc    Home
 * @access  Public
 */
router.get('/', controller.read);

router.get('/:id', controller.single);

router.get('/new', controller.new);

router.post('/create', controller.create);

// Exports
module.exports = router;
