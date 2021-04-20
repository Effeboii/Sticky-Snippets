/**
 * Module for the snippetModel
 *
 * @author Oscar Elf Svensson
 * @version 1.0.0
 */

'use strict';

const mongoose = require('mongoose');

// Create a schema
const SnippetSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, 'User ID is required.'],
    },
    username: {
      type: String,
      required: [true, 'Username is required.'],
    },
    name: {
      type: String,
      required: [true, 'Snippet name is required.'],
      trim: [true, 'Trims whitespaces at the end.'],
      minlength: [1, 'Must have minimum of 1 characters.'],
      maxlength: [50, 'No more than 50 characters allowed.'],
    },
    description: {
      type: String,
      required: [true, 'Snippet name is required.'],
      trim: [true, 'Trims whitespaces at the end.'],
      minlength: [1, 'Must have minimum of 1 characters.'],
      maxlength: [250, 'No more than 250 characters allowed.'],
    },
    code: {
      type: String,
      required: [true, 'Snippet code is required.'],
      trim: [true, 'Trims whitespaces at the end.'],
      minlength: [1, 'Must have minimum of 1 characters.'],
      maxlength: [3000, 'No more than 3000 characters allowed.'],
    },
    tag: {
      type: String,
      required: [true, 'Snippet tag is required.'],
      maxlength: [100, 'No more than 100 characters allowed.'],
      enum: ['txt', 'html', 'css', 'javascript', 'php', 'C#'],
      default: 'txt',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Inserts a new user
 *
 * @param {object} snippetData - ...
 * @param {string} snippetData.username - ...
 * @param {string} snippetData.password - ...
 * @returns {Promise<User>} - ...
 */
SnippetSchema.statics.insert = async function (snippetData) {
  const snippet = new SnippetModel(snippetData);
  return snippet.save();
};

// Creates a model using the schema
const SnippetModel = mongoose.model('Snippet', SnippetSchema);

// Exports
module.exports = SnippetModel;
