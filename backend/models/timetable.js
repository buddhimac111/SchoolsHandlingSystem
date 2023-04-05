const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const { model } = require("mongoose");
const { Subject } = require("./subject");
const timetableSchema = require("./schemas/timetable");

timetableSchema.methods.validateSubject = async function () {
  let error;
  for (const key in this._doc) {
    if (error) break;

    if (key === "__v" || key === "_id") continue;
    for (const index in this._doc[key]) {
      const result = await Subject.findById(this._doc[key][index]).select(
        "_id"
      );
      if (!result) {
        error = true;
        break;
      }
    }
  }
  return error;
};

const Timetable = model("Timetable", timetableSchema);
function validate(timetable) {
  const schema = new Joi.object({
    _id: Joi.string()
      .min(4)
      .max(100)
      .required()
      .regex(/^[A-Z]{3}\d+$/),
    monday: Joi.array()
      .length(8)
      .items(Joi.string().min(3).max(20).required())
      .required(),
    tuesday: Joi.array()
      .length(8)
      .items(Joi.string().min(3).max(20).required())
      .required(),
    wednesday: Joi.array()
      .length(8)
      .items(Joi.string().min(3).max(20).required())
      .required(),
    thursday: Joi.array()
      .length(8)
      .items(Joi.string().min(3).max(20).required())
      .required(),
    friday: Joi.array()
      .length(8)
      .items(Joi.string().min(3).max(20).required())
      .required(),
  });
  const result = schema.validate(timetable);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Timetable = Timetable;
module.exports.validateTimetable = validate;
