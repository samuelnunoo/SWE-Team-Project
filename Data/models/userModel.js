"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lovercase: true,
    trim: true,
    required: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  templates: {
    type: [Schema.Types.ObjectId],
    ref: 'TypeCollection'
  },
  documents: {
    type: [Schema.Types.ObjectId],
    ref: 'Node'
  }
});

// Compares password
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model("User", UserSchema);
