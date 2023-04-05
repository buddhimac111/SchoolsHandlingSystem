const { Schema } = require("mongoose");

const validate = [(val) => val.length === 8, "periods should have 8 periods"];
// for Timetable model
module.exports = new Schema({
  _id: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
    match: /^[A-Z]{3}\d+$/,
    ref: "Class",
  },
  monday: {
    type: [{ type: String, minlength: 5, maxlength: 20, required: true }],
    required: true,
    validate,
  },
  tuesday: {
    type: [{ type: String, minlength: 5, maxlength: 20, required: true }],
    required: true,
    validate,
  },
  wednesday: {
    type: [{ type: String, minlength: 5, maxlength: 20, required: true }],
    required: true,
    validate,
  },
  thursday: {
    type: [{ type: String, minlength: 5, maxlength: 20, required: true }],
    required: true,
    validate,
  },
  friday: {
    type: [{ type: String, minlength: 5, maxlength: 20, required: true }],
    required: true,
    validate,
  },
});
