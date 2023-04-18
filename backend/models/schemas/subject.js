const { Schema } = require("mongoose");

// for Subject model
module.exports = new Schema({
  _id: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
});
