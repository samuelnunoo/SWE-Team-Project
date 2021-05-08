"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeCollectionSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  layout: {
    type: [[String]],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  InterfaceData: {
    type: Map,
    of: Object
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

module.exports = mongoose.model("TypeCollection", TypeCollectionSchema);
