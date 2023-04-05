const { Schema } = require("mongoose");

// for Classe model
module.exports = new Schema({
  _id: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
    match: /^[A-Z]{3}\d+$/,
  },
  school: {
    type: String,
    minlength: 3,
    maxlength: 3,
    required: true,
    match: /^[A-Z]{3}$/,
    ref: "School",
  },
  grade: {
    type: Number,
    minlength: 1,
    maxlength: 20,
    required: true,
  },
  name: {
    type: String,
    minlength: 1,
    maxlenth: 20,
    match: /^[A-Z]$/,
    required: true,
  },
  year: {
    type: Number,
    minlength: 2000,
    maxlength: 2100,
    required: true,
  },
  studentCount: {
    type: Number,
    minlength: 0,
    default: 0,
  },
});
