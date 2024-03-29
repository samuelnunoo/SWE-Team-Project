"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  children: {
    type: [Schema.Types.ObjectId],
    ref: 'Node'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Node'
  },
  content: {
    type: Object,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Node", NodeSchema);
