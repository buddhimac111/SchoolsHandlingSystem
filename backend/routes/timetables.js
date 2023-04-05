const express = require("express");
const mongoose = require("mongoose");
const { studentAuth, sAdminAuth } = require("../middlewares/auth");

const { Class } = require("../models/classe");
const { Timetable, validateTimetable } = require("../models/timetable");

const router = express.Router();

// get timetable for student
router.get("/", studentAuth, async (req, res) => {
  const classe = req.user.classe;

  const timetable = await Timetable.findById(classe).select("-_id -__v");
  if (timetable) return res.send(timetable);
  res.status(404).send("Timetable not found");
});

// get timetable by class id
router.get("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;

  const timetable = await Timetable.findById(id).select("-_id -__v");
  if (timetable) return res.send(timetable);
  res.status(404).send("Timetable not found");
});

// create a new timetable
router.post("/", sAdminAuth, async (req, res) => {
  const errorMsg = validateTimetable(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);
  const result = await Class.findOne({
    _id: req.body._id,
    school: req.user.school,
  }).select("_id");
  if (!result) return res.status(400).send("Class not found");

  const classe = await Timetable.findById(req.body._id);
  if (classe)
    return res.status(400).send("Timetable already created for the class");

  const timetable = new Timetable(req.body);

  const error = await timetable.validateSubject();
  if (error) return res.status(400).send("Invalid subject");

  await timetable.save();

  res.send(timetable);
});

// update timetable with class id
router.put("/:id", sAdminAuth, async (req, res) => {
  req.body._id = req.params.id;

  const errorMsg = validateTimetable(req.body);
  if (errorMsg) res.status(400).send(errorMsg);

  const classe = await Class.findOne({
    _id: req.body._id,
    school: req.user.school,
  }).select("_id");
  if (!classe) return res.status(400).send("Class not found");

  const result = await Timetable.findById(req.body._id);
  if (!result) return res.status(404).send("Timetable not found");

  for (const key in req.body) {
    if (key === "_id") continue;
    result[key] = req.body[key];
  }
  const error = await result.validateSubject();
  if (error) return res.status(400).send("Invalid subject");

  await result.save();
  result.__v = undefined;
  result._id = undefined;
  res.send(result);
});

// delete timetable
router.delete("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;

  const classe = await Class.findOne({
    _id: id,
    school: req.user.school,
  }).select("_id");
  if (!classe) return res.status(400).send("Class not found");

  const timetable = await Timetable.findByIdAndDelete(id).select("-__v");
  if (timetable) return res.send(timetable);
  res.status(400).send("Timetable already deleted");
});

module.exports = router;
