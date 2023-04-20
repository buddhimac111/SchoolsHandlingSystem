const express = require("express");

const { Student, validateStudent } = require("../models/student");
const { Class } = require("../models/classe");
const { Exam } = require("../models/exam");
const { School } = require("../models/school");
const {
  sAdminAuth,
  teacherAuth,
  studentAuth,
  auth,
} = require("../middlewares/auth");
const { User } = require("../models/user");

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

// get student by id
router.get("/:id", auth, async (req, res) => {
  if (req.user === "dAdmin" || req.user === "student")
    res.status(401).send("Unauthorized access");
  const _id = req.params.id;
  const student = await Student.findById(_id).select("-__v");
  const user = await User.findById(_id).select("-password -__v");
  res.send({ ...student._doc, ...user._doc });
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

// analyzing student data routes

// get average result for all the subjects attend with previous exams
router.get("/averages", studentAuth, async (req, res) => {
  const exams = await Exam.aggregate([
    { $match: { student: req.user._id } },
    { $project: { results: 1, _id: 0 } },
    { $unwind: { path: "$results" } },
    { $group: { _id: "$results.subject", marks: { $avg: "$results.marks" } } },
    { $sort: { _id: 1 } },
    {
      $group: {
        _id: null,
        subjects: { $push: "$_id" },
        marks: { $push: "$marks" },
      },
    },
  ]);
  res.send(exams[0]);
});

// get previous results for all the subjects attend
router.get("/progress", studentAuth, async (req, res) => {
  const exams = await Exam.aggregate([
    { $match: { student: req.user._id } },
    {
      $lookup: {
        from: "classes",
        localField: "classe",
        foreignField: "_id",
        as: "classe",
      },
    },
    {
      $project: {
        results: 1,
        _id: 0,
        semester: 1,
        year: "$classe.year",
      },
    },
    { $unwind: { path: "$year" } },
    { $unwind: { path: "$results" } },
    {
      $group: {
        _id: "$results.subject",
        results: {
          $push: "$results.marks",
        },
        label: {
          $push: {
            $concat: [{ $toString: "$year" }, " ", { $toString: "$semester" }],
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.send(exams);
});

// get class semester marks
router.get("/semester", studentAuth, async (req, res) => {
  const exams = await Exam.aggregate([
    { $match: { student: req.user._id, classe: req.user.classe } },
    { $sort: { semester: -1 } },
    { $limit: 1 },
    { $project: { results: 1 } },
    {
      $group: {
        _id: null,
        subjects: { $push: "$results.subject" },
        marks: { $push: "$results.marks" },
      },
    },

    { $unwind: { path: "$subjects" } },
    { $unwind: { path: "$marks" } },
  ]);
  res.send(exams[0]);
});

router.get("/setAlumni/:id", teacherAuth, async (req, res) => {
  const student = await Student.findOne({
    _id: req.params.id,
    classe: req.user.classe,
  }).select("-__v");
  if (!student) return res.status(404).send("User not found");
  if (student.isAlumni)
    return res.status(400).send("Student is already an alumni");
  const classe = await Class.findByIdAndUpdate(
    student.classe,
    {
      $inc: { studentCount: -1 },
    },
    { new: true }
  );
  const school = await School.findByIdAndUpdate(
    student.school,
    {
      $inc: { studentCount: -1 },
    },
    { new: true }
  );
  student.isAlumni = true;
  await student.save();
  res.send(student);
});

module.exports = router;
