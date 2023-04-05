const { Schema } = require("mongoose");

// for Exam model
const examSchema = new Schema({
  student: {
    type: String,
    required: true,
    match: /^ST[A-Z]{3}\d+$/,
    ref: "Student",
    index: true,
  },
  classe: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
    match: /^[A-Z]{3}\d+$/,
  },
  semester: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    required: true,
  },
  results: {
    type: [
      {
        subject: {
          type: String,
          minlength: 5,
          maxlength: 20,
          required: true,
        },
        marks: {
          type: Number,
          minlength: 0,
          maxlength: 100,
          required: true,
        },
        _id: false,
      },
    ],
    required: true,
  },
});

module.exports = examSchema;
