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

router.get('/new', controller.new);

router.post('/create', controller.create);

router.get('/:id', controller.single);

router.post('/delete/:id', controller.delete);

router.get('/edit/:id', controller.edit);

router.post('/update/:id', controller.update);

// Exports
module.exports = router;
