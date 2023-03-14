const express = require("express");
const mongoose = require("mongoose");

const { Subject, validateSubject } = require("../models/subject");
const router = express.Router();

// get all the subjects
router.get("/", async (req, res) => {
  const subjects = await Subject.find({});
  res.send(subjects);
});

// get subject by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid subject id");
  const subject = await Subject.findById(id);
  if (subject) return res.send(subject);
  res.status(404).send("Subject not found");
});

// create a new subject
router.post("/", async (req, res) => {
  const errorMsg = validateSubject(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  let subject = await Subject.findOne(req.body);
  if (subject) return res.status(400).send("Subject already exists");

  subject = new Subject(req.body);
  await subject.save();

  res.send(subject);
});

// update a subject
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid subject id");

  const errorMsg = validateSubject(req.body);
  if (errorMsg) res.status(400).send(errorMsg);

  let subject = await Subject.findOne(req.body);
  if (subject) return res.status(400).send("Subject already exists");

  subject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
  if (subject) return res.send(subject);
  res.status(404).send("Subject not found");
});

// remove subject using id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid subject id");

  const result = await Subject.findByIdAndDelete(id);
  if (result) return res.send(result);
  res.status(400).send("Subject already deleted");
});

module.exports = router;
