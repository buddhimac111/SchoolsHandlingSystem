const { Student, validateStudent } = require("../models/student");
const { Teacher, validateTeacher } = require("../models/teacher");
const { SchoolAdmin, validateSAdmin } = require("../models/schoolAdmin");
const {
  DivisionalAdmin,
  validateDAdmin,
} = require("../models/divisionalAdmin");
const { School } = require("../models/school");
const { Class } = require("../models/classe");

async function createUser(role, userBody) {
  const final = { errorBody: undefined, body: undefined };

  if (role === "student") {
    final.errorBody = validateStudent(userBody);
    if (final.errorBody) return final;

    const classe = await Class.findOne({
      _id: userBody.classe,
      school: userBody.school,
    });
    if (!classe) {
      final.errorBody = "Class not found";
      return final;
    }

    final.body = new Student(userBody);
    return final;
  }

  if (role === "teacher") {
    final.errorBody = validateTeacher(userBody);
    if (final.errorBody) return final;

    const classe = await Class.findOne({
      _id: userBody.classe,
      school: userBody.school,
    });
    if (!classe) {
      final.errorBody = "Class not found";
      return final;
    }

    final.body = new Teacher(userBody);
    return final;
  }

  if (role === "sAdmin") {
    final.errorBody = validateSAdmin(userBody);
    if (final.errorBody) return final;

    const school = await School.findById(userBody.school);
    if (!school) {
      final.errorBody = "School not found";
      return final;
    }

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
