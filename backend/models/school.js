const Joi = require("joi");
const { model } = require("mongoose");
const schoolSchema = require("./schemas/school");

const School = model("School", schoolSchema);
function validate(school) {
  const schema = new Joi.object({
    _id: Joi.string()
      .min(3)
      .max(3)
      .required()
      .regex(/^[A-Z]{3}$/),
    name: Joi.string().min(5).max(255).required(),
    address: Joi.string().required(),
    picture: Joi.string().min(5).max(1024),
  });
  const result = schema.validate(school);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.School = School;
module.exports.validateSchool = validate;
