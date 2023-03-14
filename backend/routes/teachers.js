const express = require("express");
const mongoose = require("mongoose");

const { Teacher, validateTeacher } = require("../models/teacher");
const router = express.Router();

// get all the teachers
router.get("/", async (req, res) => {
  const teachers = await Teacher.find({});
  res.send(teachers);
});

// get teacher by user id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const teacher = await Teacher.findOne({ user: id });
  if (teacher) return res.send(teacher);

  res.status(404).send("User not found");
});

// update teacher by user id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  req.body.user = id;

  const errorMsg = validateTeacher(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const result = await Teacher.findOneAndUpdate({ user: id }, req.body, {
    new: true,
  });
  if (result) return res.send(result);

  res.status(404).send("User not found");
});

module.exports = router;
