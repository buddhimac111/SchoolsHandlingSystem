const express = require("express");
const mongoose = require("mongoose");

const { Teacher, validateTeacher } = require("../models/teacher");
const { Class } = require("../models/classe");
const { sAdminAuth } = require("../middlewares/auth");
const router = express.Router();

// get all the teachers
router.get("/", sAdminAuth, async (req, res) => {
  const teachers = await Teacher.find({ school: req.user.school }).select(
    "-_id -__v"
  );
  res.send(teachers);
});

// get teacher by user id
router.get("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const teacher = await Teacher.findOne({
    user: id,
    school: req.user.school,
  }).select("-_id -__v");
  if (teacher) return res.send(teacher);

  res.status(404).send("User not found");
});

// update teacher by user id
router.put("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  req.body.user = id;
  req.body.school = req.user.school;

  const errorMsg = validateTeacher(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const classe = await Class.findOne({
    _id: req.body.classe,
    school: req.body.school,
  });
  if (!classe) return res.status(400).send("Class not found");

  const result = await Teacher.findOneAndUpdate({ user: id }, req.body, {
    new: true,
  });
  if (result) return res.send(result);

  res.status(404).send("User not found");
});

module.exports = router;
