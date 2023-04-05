const { Schema } = require("mongoose");

// for Teacher model
module.exports = new Schema({
  _id: {
    type: String,
    required: true,
    match: /^TE[A-Z]{3}\d+$/,
  },
  major: {
    type: String,
    minlength: 5,
    maxlenth: 20,
    required: true,
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 512,
    required: true,
  },
  school: {
    type: String,
    minlength: 3,
    maxlength: 3,
    required: true,
    match: /^[A-Z]{3}$/,
    ref: "School",
  },
  classe: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
    match: /^[A-Z]{3}\d+$/,
    ref: "Class",
  },
  DOB: {
    type: Date,
    required: true,
  },
});
