const Joi = require("joi");
const { model } = require("mongoose");
const classSchema = require("./schemas/classe");
const getAvgMarksPipe = require("../utils/pipelines/getAvgMarks");
const getStudentsPipe = require("../utils/pipelines/getStudents");

classSchema.methods.getStudents = async function () {
  return await Class.aggregate(getStudentsPipe(this._id));
};
classSchema.methods.getAvgMarks = async function (semester) {
  return await Class.aggregate(getAvgMarksPipe(this.id, semester));
};

const Class = model("Class", classSchema);
function validate(classe) {
  const schema = new Joi.object({
    _id: Joi.string()
      .min(4)
      .max(100)
      .required()
      .regex(/^[A-Z]{3}\d+$/),
    school: Joi.string()
      .min(3)
      .max(3)
      .required()
      .regex(/^[A-Z]{3}$/),
    grade: Joi.number().min(1).max(20).required(),
    name: Joi.string()
      .min(1)
      .max(20)
      .required()
      .regex(/^[A-Z]$/),
    year: Joi.number().min(2000).max(2100).required(),
  });
  const result = schema.validate(classe);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Class = Class;
module.exports.validateClass = validate;
