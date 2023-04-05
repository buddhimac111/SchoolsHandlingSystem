const { Schema } = require("mongoose");

const parentSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    phone: {
      type: String,
      minlength: 5,
      maxlength: 20,
      required: true,
    },
  },
  { _id: false }
);

// for Student model
module.exports = new Schema({
  _id: {
    type: String,
    required: true,
    match: /^ST[A-Z]{3}\d+$/,
  },
  parent: {
    type: parentSchema,
    required: true,
  },
  address: {
    type: String,
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
  isAlumni: {
    type: Boolean,
  },
});
