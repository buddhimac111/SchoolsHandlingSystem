const { Student } = require("../models/student");
const { Teacher } = require("../models/teacher");
const { SchoolAdmin } = require("../models/schoolAdmin");
const { DivisionalAdmin } = require("../models/divisionalAdmin");

async function getUser(id, role) {
  if (role === "student") return await Student.findById(id).select("-__v");

  if (role === "teacher") return await Teacher.findById(id).select("-__v");

  if (role === "sAdmin") return await SchoolAdmin.findById(id).select("-__v");

  if (role === "dAdmin")
    return await DivisionalAdmin.findById(id).select("-__v");
}
module.exports = getUser;
