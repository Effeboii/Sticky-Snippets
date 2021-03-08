/**
 * Module for the userModel
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const isUsername = (str) => /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(str);

// Create a schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: [true, 'Trims whitespaces at the end.'],
      unique: [true, 'Username must be unique.'],
      required: [true, 'Username is required.'],
      minlength: [6, 'Must have minimum of 6 characters.'],
      maxlength: [20, 'No more than 20 characters allowed.'],
      validate: [isUsername, 'Only certain characters allowed.'],
    },
    password: {
      type: String,
      trim: [true, 'Trims whitespaces at the end.'],
      required: [true, 'User password is required.'],
      minlength: [6, 'Must have a minimum of 10 characters.'],
      maxlength: [64, 'No more than 64 characters allowed.'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
