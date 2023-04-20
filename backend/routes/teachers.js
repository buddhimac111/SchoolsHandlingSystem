const express = require("express");

const { Teacher, validateTeacher } = require("../models/teacher");
const { Exam } = require("../models/exam");
const { Class } = require("../models/classe");
const { sAdminAuth, teacherAuth } = require("../middlewares/auth");
const router = express.Router();

// get logged teacher details
router.get("/me", teacherAuth, async (req, res) => {
  const id = req.user._id;

  const teacher = await Teacher.findById(id).select("-__v");

  if (teacher) return res.send(teacher);
  res.status(404).send("User not found");
});
// teachers analytics
// get previous results for all the subjects attend
router.get("/progress", teacherAuth, async (req, res) => {
  const exams = await Exam.aggregate([
    { $match: { classe: req.user.classe } },
    { $unwind: { path: "$results" } },
    {
      $group: {
        _id: { subject: "$results.subject", semester: "$semester" },
        marks: { $avg: "$results.marks" },
      },
    },
    {
      $group: {
        _id: "$_id.semester",
        subjects: { $push: "$_id.subject" },
        marks: { $push: "$marks" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.send(exams);
});

// get all the teachers
router.get("/", sAdminAuth, async (req, res) => {
  const teachers = await Teacher.aggregate([
    { $match: { school: req.user.school } },
    { $project: { _id: 1 } },
    { $group: { _id: null, ids: { $push: "$_id" } } },
    { $project: { _id: 0, ids: 1 } },
  ]);
  res.send(teachers[0].ids);
});

// get teacher by user id
router.get("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;

  const teacher = await Teacher.findOne({
    _id: id,
    school: req.user.school,
  }).select("-__v");
  if (teacher) return res.send(teacher);

  res.status(404).send("User not found");
});

// update teacher by user id
router.put("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;

  req.body._id = id;
  const teacher = await Teacher.findOne({
    _id: id,
    school: req.user.school,
  }).select("-__v");
  if (!teacher) return res.status(404).send("User not found");

  req.body.school = teacher.school;
  req.body.classe = teacher.classe;

  const errorMsg = validateTeacher(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  teacher.address = req.body.address;
  teacher.major = req.body.major;
  teacher.DOB = req.body.DOB;

  await teacher.save();
  res.send(teacher);
});

// update student class only
router.patch("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;

  const classe = await Class.findOne({
    _id: req.body.classe,
    school: req.user.school,
  }).select("_id");
  if (!classe) return res.status(400).send("Class not found");

  const teacher = await Teacher.findById(id).select("-__v");
  if (!teacher) return res.status(404).send("User not found");
  if (teacher.school !== req.user.school)
    return res
      .status(401)
      .send("Unauthorized access, Teacher doesent belong to your school");

  teacher.classe = req.body.classe;
  teacher.save();
  return res.send(teacher);
});

module.exports = router;
