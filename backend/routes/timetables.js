const { request } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const { Class } = require("../models/classe");
const { Timetable, validateTimetable } = require("../models/timetable");

const router = express.Router();

// get timetables
router.get("/", async (req, res) => {
  const timetables = await Timetable.find({}).select("-_id -__v");
  res.send(timetables);
});

// get timetable by class id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  const timetable = await Timetable.findOne({ classe: id }).select("-_id -__v");
  if (timetable) return res.send(timetable);
  res.status(404).send("Timetable not found");
});

// create a new timetable
router.post("/", async (req, res) => {
  const errorMsg = validateTimetable(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const classe = await Timetable.findOne({ classe: req.body.classe });
  if (classe)
    return res.status(400).send("Timetable already created for the class");

  const timetable = new Timetable(req.body);
  await timetable.save();

  res.send(timetable);
});

// update timetable with class id
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  req.body.classe = id;
  const errorMsg = validateTimetable(req.body);
  if (errorMsg) res.status(400).send(errorMsg);

  const result = await Timetable.findOneAndUpdate({ classe: id }, req.body, {
    new: true,
  });

  if (result) return res.send(result);
  res.status(404).send("Timetable not found");
});

// delete timetable
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  const timetable = await Timetable.findOneAndDelete({ classe: id });
  if (timetable) return res.send(timetable);
  res.status(400).send("Timetable already deleted");
});

module.exports = router;
