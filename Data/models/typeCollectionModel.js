"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
});

module.exports = mongoose.model("TypeCollection", TypeCollectionSchema);
