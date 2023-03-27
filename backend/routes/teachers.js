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
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  req.body.user = id;
  const teacher = await Teacher.findOne({ user: id }).select("-__v");
  if (!teacher) return res.status(404).send("User not found");
  if (teacher.school.toHexString() !== req.user.school)
    return res
      .status(401)
      .send("Unauthorized access, Teacher doesent belong to your school");

  req.body.school = teacher.school.toHexString();
  req.body.classe = teacher.classe.toHexString();

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
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const classe = await Class.findOne({
    _id: req.body.classe,
    school: req.user.school,
  }).select("_id");
  if (!classe) return res.status(400).send("Class not found");

  const teacher = await Teacher.findOne({ user: id }).select("-__v");
  if (!teacher) return res.status(404).send("User not found");
  if (teacher.school.toHexString() !== req.user.school)
    return res
      .status(401)
      .send("Unauthorized access, Teacher doesent belong to your school");

  teacher.classe = req.body.classe;
  teacher.save();
  return res.send(teacher);
});

module.exports = router;
