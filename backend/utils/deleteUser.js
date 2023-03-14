const { Student } = require("../models/student");
const { Teacher } = require("../models/teacher");
const { SchoolAdmin } = require("../models/schoolAdmin");
const { DivisionalAdmin } = require("../models/divisionalAdmin");

async function deleteUser(id, role) {
  if (role === undefined) {
    return undefined;
  }

  if (role === "student") {
    return await Student.findOneAndDelete({ user: id });
  }

  if (role === "teacher") {
    return await Teacher.findOneAndDelete({ user: id });
  }

  if (role === "sAdmin") {
    return await SchoolAdmin.findOneAndDelete({ user: id });
  }

  if (role === "dAdmin") {
    return await DivisionalAdmin.findOneAndDelete({ user: id });
  }
}

module.exports = deleteUser;
