const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const { Exam, validateExam } = require("../models/exam");
const { Student } = require("../models/student");
const { Class } = require("../models/classe");

const router = express.Router();

// get all the exams
router.get("/", async (req, res) => {
  const exams = await Exam.find({});
  res.send(exams);
});

// get exam by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid exam id");

  const exam = await Exam.findById(id);
  if (exam) return res.send(exam);

  res.status(404).send("Exam not found");
});

// add new exam
router.post("/", async (req, res) => {
  const errorMsg = validateExam(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const student = await Student.findOne({ user: req.body.student });
  if (!student) return res.status(400).send("Student not found");

  const classe = await Class.findById(req.body.classe);
  if (!classe) return res.status(400).send("Class not found");

  const exist = await Exam.findOne(
    _.pick(["student", "classe", "semester"], req.body)
  );
  if (exist) return res.status(400).send("Exam already exist");

  const exam = new Exam(req.body);
  await exam.save();

  res.send(exam);
});

// update new exam by id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid exam id");

  const errorMsg = validateExam(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const result = Exam.findByIdAndUpdate(
    id,
    { results: req.body.results },
    { new: true }
  );
  if (result) return res.send(result);

  res.status(404).send("Exam not found");
});

module.exports = router;
