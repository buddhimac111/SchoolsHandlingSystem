const { Student } = require("../models/student");
const { Teacher } = require("../models/teacher");
const { SchoolAdmin } = require("../models/schoolAdmin");
const { DivisionalAdmin } = require("../models/divisionalAdmin");

async function deleteUser(id, role) {
  if (role === undefined) {
    return undefined;
  }

  if (role === "student") {
    return await Student.findByIdAndDelete(id);
  }

  if (role === "teacher") {
    return await Teacher.findByIdAndDelete(id);
  }

  if (role === "sAdmin") {
    return await SchoolAdmin.findByIdAndDelete(id);
  }

  if (role === "dAdmin") {
    return await DivisionalAdmin.findByIdAndDelete(id);
  }
}

module.exports = deleteUser;
