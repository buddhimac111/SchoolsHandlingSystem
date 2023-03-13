const Joi = require("joi");
const { model } = require("mongoose");
const userSchema = require("./schemas/user");

const User = model("User", userSchema);

function validate(user) {
  const schema = new Joi.object({
    name: Joi.string().min(5).max(20).required(),
    picture: Joi.string().min(5).max(1024),
    email: Joi.string().min(5).max(255).required(),
    role: Joi.string()
      .min(5)
      .max(20)
      .required()
      .valid("student", "teacher", "sAdmin", "dAdmin"),
    password: Joi.string().min(5).max(1024).required(),
  });
  const result = schema.validate(user);
  if (result.error) return result.error.details[0].message;
  return null;
}

async function deleteUser(id, role) {
  if (role === undefined) {
    return undefined;
  }

  if (role === "student") {
    const { Student } = require("./student");
    return await Student.findOneAndDelete({ user: id });
  }

  if (role === "teacher") {
    const { Teacher } = require("./teacher");
    return await Teacher.findOneAndDelete({ user: id });
  }

  if (role === "sAdmin") {
    const { SchoolAdmin } = require("./schoolAdmin");
    return await SchoolAdmin.findOneAndDelete({ user: id });
  }

  if (role === "dAdmin") {
    const { DivisionalAdmin } = require("./divisionalAdmin");
    return await DivisionalAdmin.findOneAndDelete({ user: id });
  }
}

module.exports.User = User;
module.exports.validateUser = validate;
module.exports.deleteUser = deleteUser;
