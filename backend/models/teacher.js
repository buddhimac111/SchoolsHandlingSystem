const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const { model } = require("mongoose");
const teacherSchema = require("./schemas/teacher");

const Teacher = model("Teacher", teacherSchema);
function validate(teacher) {
  const schema = new Joi.object({
    _id: Joi.string()
      .required()
      .regex(/^TE[A-Z]{3}\d+$/),
    major: Joi.string().required(),
    address: Joi.string().min(5).max(512).required(),
    school: Joi.string()
      .min(3)
      .max(3)
      .required()
      .regex(/^[A-Z]{3}$/),
    classe: Joi.string()
      .min(4)
      .max(100)
      .required()
      .regex(/^[A-Z]{3}\d+$/),
    DOB: Joi.date().required(),
  });
  const result = schema.validate(teacher);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Teacher = Teacher;
module.exports.validateTeacher = validate;
