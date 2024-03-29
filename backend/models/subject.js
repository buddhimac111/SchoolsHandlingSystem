const Joi = require("joi");
const { model } = require("mongoose");
const subjectSchema = require("./schemas/subject");

const Subject = model("Subject", subjectSchema);
function validate(subject) {
  const schema = new Joi.object({
    _id: Joi.string().min(3).max(20).required(),
  });
  const result = schema.validate(subject);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Subject = Subject;
module.exports.validateSubject = validate;
