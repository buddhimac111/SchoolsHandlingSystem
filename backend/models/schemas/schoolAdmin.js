const { Schema } = require("mongoose");

// for SchoolAdmin model
module.exports = new Schema({
  _id: {
    type: String,
    required: true,
    match: /^SA[A-Z]{3}\d+$/,
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
  },
  DOB: {
    type: Date,
    required: true,
  },
});
