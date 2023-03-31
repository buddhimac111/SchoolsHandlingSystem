const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const { model } = require("mongoose");
const { Subject } = require("./subject");
const timetableSchema = require("./schemas/timetable");

timetableSchema.methods.validateSubject = async function () {
  let error;
  for (date of this.dates) {
    if (error) break;
    for (subject of date.periods) {
      const result = await Subject.findOne({ name: subject }).select("_id");
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
    classe: Joi.objectId().required(),
    dates: Joi.array()
      .length(5)
      .items(
        Joi.object({
          periods: Joi.array()
            .length(8)
            .items(Joi.string().min(5).max(20).required())
            .required(),
        })
      )
      .required(),
  });
  const result = schema.validate(timetable);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Timetable = Timetable;
module.exports.validateTimetable = validate;
