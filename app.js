/**
 * The starting point of the application
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const express = require('express');
const hbs = require('express-hbs');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const createError = require('http-errors');
const mongoose = require('./src/config/mongoose');
require('dotenv').config();

// Create express application
const app = express();

// Helmet security
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'"],
      imgSrc: ["'self'", 'cdn.jsdelivr.net'],
      scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", 'cdn.jsdelivr.net'],
    },
  })
);

// Connect to the database
mongoose.connect().catch((error) => {
  console.error(error);
  process.exit(1);
});

// View engine setup
app.engine(
  'hbs',
  hbs.express4({
    defaultLayout: path.join(__dirname, 'src', 'views', 'layouts', 'default'),
    partialsDir: path.join(__dirname, 'src', 'views', 'partials'),
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Additional middlewares
app.use(logger('dev')); // Request logger
app.use(express.json()); // Parses JSON
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./src/routes/homeRouter'));
app.use('/accounts', require('./src/routes/accountRouter'));
app.use('*', (req, res, next) => next(createError(404)));

// Error handler
app.use((error, req, res, next) => {});

// Start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log('Press Ctrl-C to terminate...');
});
