const Joi = require("joi");
const { model } = require("mongoose");
const sAdminSchema = require("./schemas/schoolAdmin");

const SchoolAdmin = model("SchoolAdmin", sAdminSchema);
function validate(sAdmin) {
  const schema = new Joi.object({
    _id: Joi.string()
      .required()
      .regex(/^SA[A-Z]{3}\d+$/),
    address: Joi.string().min(5).max(512).required(),
    school: Joi.string()
      .min(3)
      .max(3)
      .required()
      .regex(/^[A-Z]{3}$/),
    DOB: Joi.date().required(),
  });
  const result = schema.validate(sAdmin);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.SchoolAdmin = SchoolAdmin;
module.exports.validateSAdmin = validate;
