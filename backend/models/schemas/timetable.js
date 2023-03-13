const { Schema } = require("mongoose");

const dateSchema = new Schema(
  {
    periods: {
      type: [{ type: String, minlength: 5, maxlength: 20, required: true }],
      required: true,
      validate: [(val) => val.length === 8, "periods should have 8 periods"],
    },
  },
  { _id: false }
);

// for Timetable model
module.exports = new Schema({
  classe: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
    unique: true,
  },
  dates: {
    type: [dateSchema],
    required: true,
    validate: [(val) => val.length === 5, "dates should have 5 dates"],
  },
});
