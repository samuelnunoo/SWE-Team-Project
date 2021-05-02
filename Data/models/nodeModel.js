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
  Parent: {
    type: Schema.Types.ObjectId,
    ref: 'Node'
  },
  Content: {
    type: Object,
  }
});

module.exports = mongoose.model("Node", NodeSchema);
