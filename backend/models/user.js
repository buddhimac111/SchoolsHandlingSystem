const Joi = require("joi");
const { model } = require("mongoose");
const userSchema = require("./schemas/user");
const jwt = require("jsonwebtoken");

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_PRIVATE_KEY
  );
};

const User = model("User", userSchema);

function validate(user) {
  const schema = new Joi.object({
    _id: Joi.string()
      .required()
      .regex(/^DA\d+|SA[A-Z]{3}\d+|TE[A-Z]{3}\d+|ST[A-Z]{3}\d+$/),
    name: Joi.string().min(5).max(20).required(),
    picture: Joi.string().min(5).max(1024),
    email: Joi.string().min(5).max(255).required(),
    role: Joi.string()
      .min(5)
      .max(20)
      .required()
      .valid("student", "teacher", "sAdmin", "dAdmin"),
    gender: Joi.string().valid("male", "female").required(),
    password: Joi.string().min(5).max(1024).required(),
  });
  const result = schema.validate(user);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.User = User;
module.exports.validateUser = validate;
