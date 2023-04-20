const { DivisionalAdmin } = require("../models/divisionalAdmin");
const { SchoolAdmin } = require("../models/schoolAdmin");
const { Teacher } = require("../models/teacher");
const { Student } = require("../models/student");

async function generateId(role, school) {
  if (role === "dAdmin") {
    const last = await DivisionalAdmin.findOne({})
      .sort({ _id: -1 })
      .select("_id");
    if (!last) return "DA1";
    return `DA${parseInt(last._id.slice(2)) + 1}`;
  }
  if (role === "sAdmin") {
    const last = await SchoolAdmin.findOne({ school })
      .sort({ _id: -1 })
      .select("_id");
    if (!last) return `SA${school}1`;
    return `SA${school}${parseInt(last._id.slice(5)) + 1}`;
  }
  if (role === "teacher") {
    const last = await Teacher.findOne({ school })
      .sort({ _id: -1 })
      .select("_id");
    if (!last) return `TE${school}1`;
    return `TE${school}${parseInt(last._id.slice(5)) + 1}`;
  }
  if (role === "student") {
    const last = await Student.findOne({ school })
      .sort({ _id: -1 })
      .select("_id");
    if (!last) return `ST${school}1`;
    return `ST${school}${parseInt(last._id.slice(5)) + 1}`;
  }
}
module.exports = generateId;
