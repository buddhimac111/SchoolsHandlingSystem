const express = require("express");

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

  const classe = await Class.findOne({ _id, school: req.user.school }).select(
    "-__v"
  );
  if (classe) return res.send(classe);

  res.status(404).send("Class not found");
});

// create a new class
router.post("/", sAdminAuth, async (req, res) => {
  req.body.school = req.user.school;

  let classe = await Class.findOne(req.body);
  if (classe) return res.status(400).send("Class already exists");

  const exist = await Class.findOne({ school: req.body.school })
    .sort({ _id: -1 })
    .select("_id");
  if (!exist) req.body._id = `${req.body.school}1`;
  else req.body._id = `${req.body.school}${parseInt(exist._id.slice(3)) + 1}`;

  const errorMsg = validateClass(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  classe = new Class(req.body);
  await classe.save();

  res.send(classe);
});

// update a new class
router.put("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  req.body.school = req.user.school;

  let classe = await Class.findOne(req.body);

  if (classe) {
    if (classe.id === id) return res.send(classe);
    return res.status(400).send("Class already exists");
  }

  req.body._id = id;
  const errorMsg = validateClass(req.body);
  if (errorMsg) res.status(400).send(errorMsg);
  req.body._id = undefined;

  classe = await Class.findByIdAndUpdate(id, req.body, { new: true });
  if (classe) return res.send(classe);
  res.status(404).send("Class not found");
});

// remove class using id
router.delete("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;

  const result = await Class.findOneAndDelete({
    _id: id,
    school: req.user.school,
  });
  if (result) return res.send(result);
  res.status(400).send("Class already deleted");
});

// get all the students for a class
router.get("/students/:id", sAdminAuth, async (req, res) => {
  const _id = req.params.id;

  const classe = await Class.findOne({ _id, school: req.user.school });
  if (!classe) return res.status(404).send("Class not found");

  const students = await classe.getStudents();
  res.send(students[0].students);
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

  const classe = await Class.findById(id);
  if (!classe) return res.status(404).send("Class not found");

  const results = {};

  results.semester1 = await classe.getAvgMarks(1);
  results.semester2 = await classe.getAvgMarks(2);
  results.semester3 = await classe.getAvgMarks(3);

  res.send(results);
});

module.exports = router;
