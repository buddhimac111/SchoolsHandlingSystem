const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const { model } = require("mongoose");
const studentSchema = require("./schemas/student");

const Student = model("Student", studentSchema);
function validate(student) {
  const schema = new Joi.object({
    _id: Joi.string()
      .required()
      .regex(/^ST[A-Z]{3}\d+$/),
    parent: Joi.object({
      name: Joi.string().min(5).max(255).required(),
      phone: Joi.string().min(5).max(20).required(),
    }).required(),
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
    isAlumni: Joi.boolean(),
  });
  const result = schema.validate(student);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Student = Student;
module.exports.validateStudent = validate;
