const { Student } = require("../models/student");
const { Teacher } = require("../models/teacher");
const { SchoolAdmin } = require("../models/schoolAdmin");
const { DivisionalAdmin } = require("../models/divisionalAdmin");

async function getUser(user, role) {
  if (role === "student")
    return await Student.findOne({ user }).select("-__v -_id -user");

  if (role === "teacher")
    return await Teacher.findOne({ user }).select("-__v -_id -user");

  if (role === "sAdmin")
    return await SchoolAdmin.findOne({ user }).select("-__v -_id -user");

  if (role === "dAdmin")
    return await DivisionalAdmin.findOne({ user }).select("-__v -_id -user");
}
module.exports = getUser;
