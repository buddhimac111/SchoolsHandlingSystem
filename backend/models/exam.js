const Joi = require("joi");
const { model } = require("mongoose");
const examSchema = require("./schemas/exam");

const Exam = model("Exam", examSchema);
function validate(exam) {
  const schema = new Joi.object({
    student: Joi.string()
      .required()
      .regex(/^ST[A-Z]{3}\d+$/),
    classe: Joi.string()
      .min(4)
      .max(100)
      .required()
      .regex(/^[A-Z]{3}\d+$/),
    semester: Joi.number().min(1).max(20).required(),
    results: Joi.array()
      .items(
        Joi.object({
          subject: Joi.string().min(3).max(20).required(),
          marks: Joi.number().min(0).max(100).required(),
        })
      )
      .min(1)
      .required(),
  });
  const result = schema.validate(exam);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Exam = Exam;
module.exports.validateExam = validate;
