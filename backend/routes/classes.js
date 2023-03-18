const express = require("express");
const mongoose = require("mongoose");

const { Class, validateClass } = require("../models/classe");

const { sAdminAuth, teacherAuth } = require("../middlewares/auth");

const router = express.Router();

// get all the classes
router.get("/", sAdminAuth, async (req, res) => {
  const classes = await Class.find({ school: req.user.school });
  res.send(classes);
});

// get teachers class
router.get("/class", teacherAuth, async (req, res) => {
  const classe = await Class.findOne({
    _id: req.user.classe,
    school: req.user.school,
  });
  if (!classe) return res.status(404).send("Class not found");

  res.send(classe);
});

// get students for teachers class
router.get("/students", teacherAuth, async (req, res) => {
  const classe = await Class.findOne({
    _id: req.user.classe,
    school: req.user.school,
  });
  if (!classe) return res.status(404).send("Class not found");

  const students = await classe.getStudents();
  res.send(students);
});

// get class by id
router.get("/:id", sAdminAuth, async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(_id))
    return res.status(400).send("Invalid class id");

  const classe = await Class.findOne({ _id, school: req.user.school });
  if (classe) return res.send(classe);

  res.status(404).send("Class not found");
});

// create a new class
router.post("/", sAdminAuth, async (req, res) => {
  req.body.school = req.user.school;

  const errorMsg = validateClass(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  let classe = await Class.findOne(req.body);
  if (classe) return res.status(400).send("Class already exists");

  classe = new Class(req.body);
  await classe.save();

  res.send(classe);
});

// update a new class
router.put("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  req.body.school = req.user.school;

  const errorMsg = validateClass(req.body);
  if (errorMsg) res.status(400).send(errorMsg);

  let classe = await Class.findOne(req.body);
  if (classe) return res.status(400).send("Class already exists");

  classe = await Class.findByIdAndUpdate(id, req.body, { new: true });
  if (classe) return res.send(classe);
  res.status(404).send("Class not found");
});

// remove class using id
router.delete("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  const result = await Class.findOneAndDelete({
    _id: id,
    school: req.user.school,
  });
  if (result) return res.send(result);
  res.status(400).send("Class already deleted");
});

// update student count of a class
router.get("/updateCount/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  studentCount = await Student.find({ classe: id }).count();

  const result = await Class.findOneAndUpdate(
    { _id: id, school: req.user.school },
    { studentCount },
    { new: true }
  );
  if (result) return res.send(result);
  res.status(404).send("Class not found");
});

// get all the students for a class
router.get("/students/:id", sAdminAuth, async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(_id))
    return res.status(400).send("Invalid class id");

  const classe = await Class.findOne({ _id, school: req.user.school });
  if (!classe) return res.status(404).send("Class not found");

  const students = await classe.getStudents();
  res.send(students);
});

// get average marks for teachers class
router.get("/marks/average", teacherAuth, async (req, res) => {
  const classe = await Class.findOne({
    _id: req.user.classe,
    school: req.user.school,
  });
  if (!classe) return res.status(404).send("Class not found");

  const results = {};

  results.semester1 = await classe.getAvgMarks(1);
  results.semester2 = await classe.getAvgMarks(2);
  results.semester3 = await classe.getAvgMarks(3);

  res.send(results);
});

// get average marks for a class
router.get("/marks/average/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  const classe = await Class.findById(id);
  if (!classe) return res.status(404).send("Class not found");

  const results = {};

  results.semester1 = await classe.getAvgMarks(1);
  results.semester2 = await classe.getAvgMarks(2);
  results.semester3 = await classe.getAvgMarks(3);

  res.send(results);
});

module.exports = router;
