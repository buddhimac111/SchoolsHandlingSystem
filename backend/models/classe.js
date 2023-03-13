const Joi = require("joi");
const { model } = require("mongoose");
const classSchema = require("./schemas/classe");

const Class = model("Class", classSchema);
function validate(classe) {
  const schema = new Joi.object({
    grade: Joi.number().min(1).max(20).required(),
    name: Joi.string().min(1).max(20).required(),
    year: Joi.number().min(2000).max(2100).required(),
  });
  const result = schema.validate(classe);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Class = Class;
module.exports.validateClass = validate;
