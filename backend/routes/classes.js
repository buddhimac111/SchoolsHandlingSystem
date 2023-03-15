const express = require("express");
const mongoose = require("mongoose");

const { Class, validateClass } = require("../models/classe");
const { School } = require("../models/school");
const { Student } = require("../models/student");
const router = express.Router();

// get all the classes
router.get("/", async (req, res) => {
  const classes = await Class.find({});
  res.send(classes);
});

// get class by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");
  const classe = await Class.findById(id);
  if (classe) return res.send(classe);
  res.status(404).send("Class not found");
});

// create a new class
router.post("/", async (req, res) => {
  const errorMsg = validateClass(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const school = await School.findById(req.body.school);
  if (!school) return res.status(400).send("School not found");

  let classe = await Class.findOne(req.body);
  if (classe) return res.status(400).send("Class already exists");

  classe = new Class(req.body);
  await classe.save();

  res.send(classe);
});

// update a new class
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  const errorMsg = validateClass(req.body);
  if (errorMsg) res.status(400).send(errorMsg);

  let classe = await Class.findOne(req.body);
  if (classe) return res.status(400).send("Class already exists");

  classe = await Class.findByIdAndUpdate(id, req.body, { new: true });
  if (classe) return res.send(classe);
  res.status(404).send("Class not found");
});

// remove class using id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  const result = await Class.findByIdAndDelete(id);
  if (result) return res.send(result);
  res.status(400).send("Class already deleted");
});

// update student count of a class
router.get("/updateCount/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  studentCount = await Student.find({ classe: id }).count();

  const result = await Class.findByIdAndUpdate(
    id,
    { studentCount },
    { new: true }
  );
  if (result) return res.send(result);
  res.status(404).send("Class not found");
});

module.exports = router;
