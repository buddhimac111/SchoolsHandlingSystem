const { Student } = require("./student");
const { Teacher } = require("./teacher");
const { SchoolAdmin } = require("./schoolAdmin");
const { DivisionalAdmin } = require("./divisionalAdmin");

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
