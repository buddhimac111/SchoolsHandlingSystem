const { Schema } = require("mongoose");

// for User model
module.exports = new Schema({
  _id: {
    type: String,
    required: true,
    match: /^DA\d+|SA[A-Z]{3}\d+|TE[A-Z]{3}\d+|ST[A-Z]{3}\d+$/,
  },
  name: {
    type: String,
    minlength: 5,
    maxlenth: 20,
    required: true,
  },
  picture: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
    default: "profilePic/default.png",
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    index: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "sAdmin", "dAdmin"],
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
});
