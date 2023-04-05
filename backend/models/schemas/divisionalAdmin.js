const { Schema } = require("mongoose");

// for DivisionalAdmin model
module.exports = new Schema({
  _id: {
    type: String,
    minlength: 3,
    required: true,
    match: /^DA\d+$/,
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 512,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
});
