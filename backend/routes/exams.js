const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const { Exam, validateExam } = require("../models/exam");
const { Student } = require("../models/student");
const { studentAuth, teacherAuth } = require("../middlewares/auth");

const router = express.Router();

// get all the exams for student
router.get("/", studentAuth, async (req, res) => {
  const exams = await Exam.find({ student: req.user._id }).select("-__v");
  res.send(exams);
});

// get exams for a class
router.get("/class", teacherAuth, async (req, res) => {
  const exams = await Exam.find({ classe: req.user.classe });
  res.send(exams);
});

// add new exam
router.post("/", teacherAuth, async (req, res) => {
  req.body.classe = req.user.classe;

  const errorMsg = validateExam(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const student = await Student.findById(req.body.student);
  if (!student) return res.status(400).send("Student not found");

  const exist = await Exam.findOne(
    _.pick(req.body, ["student", "classe", "semester"])
  );
  if (exist) return res.status(400).send("Exam already exist");

  const exam = new Exam(req.body);
  await exam.save();

  res.send(exam);
});

// update exam by its id
router.put("/:id", teacherAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid exam id");

  req.body.classe = req.user.classe;
  const exam = await Exam.findById(id).select("-__v");
  if (!exam) return res.status(404).send("Exam not found");

  req.body.classe = exam.classe;
  req.body.student = exam.student;
  req.body.semester = exam.semester;

  const errorMsg = validateExam(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  exam.results = req.body.results;
  await exam.save();

  res.status(404).send(exam);
});

// delete exam
router.delete("/:id", teacherAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid exam id");

  const result = await Exam.findByIdAndDelete(id);
  if (result) return res.send(result);

  res.status(404).send("Exam already deleted");
});

module.exports = router;
