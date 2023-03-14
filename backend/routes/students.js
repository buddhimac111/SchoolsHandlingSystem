const express = require("express");
const mongoose = require("mongoose");

const { Student, validateStudent } = require("../models/student");

const router = express.Router();

// get all the students
router.get("/", async (req, res) => {
  const students = await Student.find({}).select("-_id -__v -parent._id");
  res.send(students);
});

// get student by their user id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");
  const student = await Student.findOne({ user: id })
    .select("-_id -__v -parent._id")
    .populate("user");
  if (!student) return res.status(404).send("User not found");
  res.send(student);
});

// update a student by their user id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  req.body.user = id;

  const errorStudent = validateStudent(req.body);
  if (errorStudent) return res.status(400).send(errorStudent);

  const result = await Student.findOneAndUpdate({ user: id }, req.body, {
    new: true,
  });
  if (!result) return res.status(404).send("User not found");

  res.send(result);
});

module.exports = router;
