const { Student, validateStudent } = require("../models/student");
const { Teacher, validateTeacher } = require("../models/teacher");
const { SchoolAdmin, validateSAdmin } = require("../models/schoolAdmin");
const {
  DivisionalAdmin,
  validateDAdmin,
} = require("../models/divisionalAdmin");

function createUser(role, userBody) {
  const final = { errorBody: undefined, body: undefined };

  if (role === "student") {
    final.errorBody = validateStudent(userBody);
    if (final.errorBody) return final;

    final.body = new Student(userBody);
    return final;
  }

  if (role === "teacher") {
    final.errorBody = validateTeacher(userBody);
    if (final.errorBody) return final;

    final.body = new Teacher(userBody);
    return final;
  }

  if (role === "sAdmin") {
    final.errorBody = validateSAdmin(userBody);
    if (final.errorBody) return final;

    final.body = new SchoolAdmin(userBody);
    return final;
  }

  if (role === "dAdmin") {
    final.errorBody = validateDAdmin(userBody);
    if (final.errorBody) return final;

    final.body = new DivisionalAdmin(userBody);
    return final;
  }
}
module.exports = createUser;
