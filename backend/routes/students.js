const express = require("express");
const mongoose = require("mongoose");

const { Student, validateStudent } = require("../models/student");
const { Class } = require("../models/classe");
const { sAdminAuth, teacherAuth } = require("../middlewares/auth");

const router = express.Router();

// get all the students
router.get("/", sAdminAuth, async (req, res) => {
  const students = await Student.find({ school: req.user.school }).select(
    "-_id -__v"
  );
  res.send(students);
});

// get all the students in a class
router.get("/class", teacherAuth, async (req, res) => {
  const students = await Student.find({ classe: req.user.classe }).select(
    "-_id -__v"
  );
  res.send(students);
});

// TODO: IS this really necesseary?
// get student by their user id
// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   if (!mongoose.isValidObjectId(id))
//     return res.status(400).send("Invalid user id");
//   const student = await Student.findOne({ user: id })
//     .select("-_id -__v")
//     .populate("user");
//   if (!student) return res.status(404).send("User not found");
//   res.send(student);
// });

// update a student by their user id
router.put("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  req.body.user = id;
  const student = await Student.findOne({ user: id }).select("-__v");
  if (!student) return res.status(404).send("User not found");
  if (student.school.toHexString() !== req.user.school)
    return res
      .status(401)
      .send("Unauthorized access, Student doesent belong to your school");

  req.body.school = student.school.toHexString();
  req.body.classe = student.classe.toHexString();

  const errorStudent = validateStudent(req.body);
  if (errorStudent) return res.status(400).send(errorStudent);

  student.parent = req.body.parent;
  student.address = req.body.address;
  student.DOB = req.body.DOB;

  await student.save();

  res.send(student);
});

// update student class only
router.patch("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const classe = await Class.findOne({
    _id: req.body.classe,
    school: req.user.school,
  }).select("_id");
  if (!classe) return res.status(400).send("Class not found");

  const student = await Student.findOne({ user: id }).select("-__v");
  if (!student) return res.status(404).send("User not found");
  if (student.school.toHexString() !== req.user.school)
    return res
      .status(401)
      .send("Unauthorized access, Student doesent belong to your school");

  student.classe = req.body.classe;
  student.save();
  return res.send(student);
});

module.exports = router;
