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
const moment = require('moment');
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
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'getbootstrap.com'],
      scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", 'cdn.jsdelivr.net', 'fonts.googleapis.com'],
    },
  })
);

// Setup session store with the given options.
const sessionOptions = {
  name: process.env.COOKIE_NAME,
  secret: process.env.COOKIE_SECRET,
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax', // Protect against csrf-attack
    httpOnly: true, // Dont allow client script messing with the cookie
  },
};
app.use(session(sessionOptions));

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

// Middleware to be executed before the routes.
app.use((req, res, next) => {
  if (req.session.flash) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
  }

  if (req.session.user) {
    res.locals.user = req.session.user;
  }

  if (req.session.isLoggedIn) {
    res.locals.isLoggedIn = req.session.isLoggedIn;
  }
  next();
});

// Routes
app.use('/', require('./src/routes/root'));
app.use('/users', require('./src/routes/userRouter'));
app.use('/snippets', require('./src/routes/snippetRouter'));
app.use('*', (req, res, next) => next(createError(404)));

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status).render('errors/error', { error });
});

// Start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log('Press Ctrl-C to terminate...');
});
