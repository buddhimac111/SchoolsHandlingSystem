const express = require("express");

const { Student, validateStudent } = require("../models/student");
const { Class } = require("../models/classe");
const { sAdminAuth, teacherAuth } = require("../middlewares/auth");

const router = express.Router();

// get all the students
router.get("/", sAdminAuth, async (req, res) => {
  const students = await Student.aggregate([
    { $match: { school: req.user.school } },
    { $project: { _id: 1 } },
    { $group: { _id: null, ids: { $push: "$_id" } } },
    { $project: { _id: 0, ids: 1 } },
  ]);
  res.send(students[0].ids);
});

// get all the students in a class
router.get("/class", teacherAuth, async (req, res) => {
  const students = await Student.aggregate([
    { $match: { school: req.user.school, classe: req.user.classe } },
    { $project: { _id: 1 } },
    { $group: { _id: null, ids: { $push: "$_id" } } },
    { $project: { _id: 0, ids: 1 } },
  ]);
  res.send(students[0].ids);
});

// update a student by their user id
router.put("/:id", sAdminAuth, async (req, res) => {
  const _id = req.params.id;

  req.body._id = _id;
  const student = await Student.findOne({
    _id,
    school: req.user.school,
  }).select("-__v");
  if (!student) return res.status(404).send("User not found");
  if (student.school !== req.user.school)
    return res
      .status(401)
      .send("Unauthorized access, Student doesent belong to your school");

  req.body.school = student.school;
  req.body.classe = student.classe;

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
  const _id = req.params.id;

  const classe = await Class.findOne({
    _id: req.body.classe,
    school: req.user.school,
  }).select("_id");
  if (!classe) return res.status(400).send("Class not found");

  const student = await Student.findOne({
    _id,
    school: req.user.school,
  }).select("-__v");
  if (!student) return res.status(404).send("User not found");

  const old = await Class.findByIdAndUpdate(
    student.classe,
    {
      $inc: { studentCount: -1 },
    },
    { new: true }
  );
  student.classe = req.body.classe;
  const newC = await Class.findByIdAndUpdate(
    student.classe,
    {
      $inc: { studentCount: 1 },
    },
    { new: true }
  );
  console.log(old, newC);
  await student.save();
  return res.send(student);
});

module.exports = router;
